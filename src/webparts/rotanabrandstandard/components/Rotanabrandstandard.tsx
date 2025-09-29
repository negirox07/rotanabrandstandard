import * as React from 'react';
import styles from './Rotanabrandstandard.module.scss';
import { IRotanabrandstandardProps } from './IRotanabrandstandardProps';
import { IRotanaBrandStandardState } from './IRotanaBrandStandardState';
import { LogDetails } from '../../../models/LogDetails';
import { toChoiceOptions, toMultiDropdownOptions } from '../../../services/DepartmentHelper';
import { BrandPageConstants } from '../../../models/SPConstants';
import { decryptQuery } from '../../../services/CryptoHelper';
import { Utility } from '../../../services/Utility';
import { BrandDTO } from '../../../models/BrandModel';
import { ConfigItem } from '../../../models/ConfigModel';
import BannerSection from './banner/BannerSection';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import BrandCard from './brand/SelectedBrandCard';
import FilterBar from './filters/FilterBar';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BrandStandardsData from './standard/BrandStandardsData';
export default class Rotanabrandstandard extends React.Component<IRotanabrandstandardProps, IRotanaBrandStandardState> {
  private readonly LOG_SOURCE = "📝 RotanaBrandStandard";
  private readonly bannerId = `banner_${Math.random().toString(36).substring(2, 15)}`;
  constructor(props: IRotanabrandstandardProps) {
    super(props);
    this.state = {
      configItems: [],
      brandListItems: [],
      brandStandardListItems: [],
      departMentListItems: [],
      standardListItems: [],
      brandStandardListItemsCopy: [],
      brandDropdownOptions: [],
      tabsData: [],
      journeyDropDownOptions: [],
      touchPointOptions: [],
      selectedBrand: null,
      selectedBrandObj: null,
      selectedDepartment: [],
      selectedStandard: "",
      searchText: "",
      bannerTitle: "",
      bannerDescription: "",
      hotelsTitle: "",
      hotelsDescription: "",
      loading: true,
    };
    this.OnSearch = this.OnSearch.bind(this);
    this.OnSelectedTouchPoint = this.OnSelectedTouchPoint.bind(this);
    this.OnSelectedBrand = this.OnSelectedBrand.bind(this);
    this.OnSelectedJourney = this.OnSelectedJourney.bind(this);
    this.SetSearchText = this.SetSearchText.bind(this);
    this.OnClear = this.OnClear.bind(this);
  }
  async componentDidMount(): Promise<void> {
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    const { spHelper, webpartContext, configListName, brands, brandStandards } =
      this.props;
    try {
      const baseUrl = webpartContext.pageContext.web.absoluteUrl;

      const endpoints = [
        `/_api/web/lists/getbytitle('${configListName}')/items?$top=4999&$select=Title,ConfigValue`,
        `/_api/web/lists/getbytitle('${brands}')/items?$top=4999&$select=Title,*`,
        `/_api/web/lists/getbytitle('${brandStandards}')/items?$top=4999&$select=Title,*`,
        `/_api/web/lists/getbytitle('${brandStandards}')/fields?$filter=EntityPropertyName eq 'Category'`,
        `/_api/web/lists/getbytitle('${brandStandards}')/fields?$filter=EntityPropertyName eq 'Touchpoint'`
      ];

      const [configRes, brandsRes, brandStandardsRes, journeyResp, touchPointResp] = await Promise.all(
        endpoints.map((endpoint) => spHelper.getListDataRecursive(baseUrl + endpoint, []))
      );

      const configItems: ConfigItem[] = configRes || [];
      const getConfigValue = (key: string): string =>
        configItems.find((item) => item.Title === key)?.ConfigValue || "";

      // Handle query param "brand"
      const queryParams = Utility.getQueryParams(window.location.href);
      let selectedBrand: string | null = null;
      let selectedBrandObj: BrandDTO | null = null;

      if (queryParams.brand) {
        selectedBrandObj = decryptQuery(queryParams.brand) as BrandDTO;
        selectedBrand = selectedBrandObj?.Title?.toString() || null;
      }
      const journeys = [];
      const journeysDropDownOptions = (toChoiceOptions([...journeyResp[0].Choices])).sort((a, b) => a.label.localeCompare(b.label));
      journeys.push('All', ...journeyResp[0].Choices);
      const brandStandardListItemsCopy = JSON.parse(JSON.stringify(brandStandardsRes));
      const touchPointOptions = toChoiceOptions(['All', ...touchPointResp[0].Choices.sort()]);
      this.setState({
        configItems,
        brandListItems: brandsRes || [],
        brandStandardListItems: brandStandardsRes || [],
        brandDropdownOptions: toMultiDropdownOptions(brandsRes).sort((a, b) => a.label.localeCompare(b.label)),
        journeyDropDownOptions: journeysDropDownOptions,
        brandStandardListItemsCopy: brandStandardListItemsCopy,
        tabsData: journeys,
        touchPointOptions: touchPointOptions,
        bannerTitle: getConfigValue(BrandPageConstants.LandingPageBannerTitle),
        bannerDescription: getConfigValue(BrandPageConstants.LandingPageBannerDescription),
        selectedBrand,
        selectedBrandObj,
        loading: false,
      });
    } catch (error) {
      await this.logExceptions(error, "loadData", "RotanaBrandStandard Initialization");
    }
  }

  private async logExceptions(ex: any, methodName: string, subMethodName: string): Promise<void> {
    const log: LogDetails = {
      Title: this.LOG_SOURCE,
      ErrorMessage: ex?.message || ex.toString(),
      SubMethodName: subMethodName,
      MethodName: methodName,
      StackTrace: ex?.stackTrace || ex?.stack || "",
    };
    await this.props.spHelper.writeLog(this.props, log);
  }

  private GetJourneyCount(x: string): number {
    const brandStandardData = this.state.brandStandardListItems || [];
    if (x === 'All') return brandStandardData.length;
    return brandStandardData.filter(y => y.Category?.trim().toLowerCase() === x.toLowerCase()).length;
  }
  private applyFilters(): void {
    const {
      brandStandardListItemsCopy,
      brandListItems,
      selectedBrand,
      selectedStandard,
      searchText
    } = this.state;

    let filtered = [...brandStandardListItemsCopy];

    // Filter by Brand (if selected)
    if (selectedBrand) {
      const selectedBrandItem = brandListItems.find(
        (x) => x.ID?.toString().toLowerCase() === selectedBrand.toLowerCase()
      );
      if (selectedBrandItem) {
        filtered = filtered.filter((brand) =>
          brand.AssociatedToId?.includes(selectedBrandItem.ID)
        );
      }
    }

    // Filter by Touchpoint (if selected and not "All")
    if (selectedStandard && selectedStandard.toLowerCase() !== "all") {
      filtered = filtered.filter(
        (brand) =>
          brand.Touchpoint?.toLowerCase() === selectedStandard.toLowerCase()
      );
    }

    // Filter by Search text
    if (searchText && searchText.trim().length > 0) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        (brand) =>
          brand.RefNo?.toLowerCase().includes(text) ||
          brand.Category?.toLowerCase().includes(text) ||
          brand.Touchpoint?.toLowerCase().includes(text) ||
          brand.Title?.toLowerCase().includes(text) ||
          brand.Standard?.toLowerCase().includes(text)
      );
    }

    this.setState({ brandStandardListItems: filtered });
  }
  private OnSearch(): void {
    this.applyFilters();
  }

  private OnSelectedTouchPoint(value: string): void {
    this.setState({ selectedStandard: value }, () => this.applyFilters());
  }
  private OnSelectedBrand(value: string): void {
    this.setState({ selectedBrand: value }, () => this.applyFilters());
  }
  private OnSelectedJourney(value: string[]): void {
    this.setState({ selectedDepartment: value }, () => this.applyFilters());
  }
  private SetSearchText(value: string): void {
    this.setState({ searchText: value });
  }
  private OnClear(): void {
    this.setState({ selectedStandard: "All", searchText: '' }, () => this.applyFilters());
  }
  public render(): React.ReactElement<IRotanabrandstandardProps> {
    const {
      configItems,
      bannerTitle,
      bannerDescription,
      loading,
      brandDropdownOptions,
      journeyDropDownOptions,
      tabsData,
      touchPointOptions,
      brandStandardListItems,
      selectedBrand,
      selectedDepartment,
      selectedStandard,
      selectedBrandObj
    } = this.state;
    const tabClass = `react-tabs__tab ${styles.categoryFiltersLink}`
    if (loading) {
      return (
        <Spinner label="Loading ..." size={SpinnerSize.large} />
      );
    }

    if (!loading && configItems.length === 0) {
      return (
        <div>No configuration found</div>
      );
    }
    return (
      <section className={styles.rotanabrandstandard}>
        <BannerSection
          bannerId={this.bannerId}
          bannerImageURL={this.props.bannerImgURL}
          bannerImageURL2={this.props.bannerImgURL2}
          bannerTitle={bannerTitle}
          bannerDescription={bannerDescription}
        />
        <div id="mainContent">
          {selectedBrandObj && <BrandCard brand={selectedBrandObj} />}
          <div className={styles.bottomLine} />
          <FilterBar
            brandDropdownOptions={brandDropdownOptions}
            selectedBrand={selectedBrand}
            onBrandChange={this.OnSelectedBrand}

            departmentDropdownOptions={journeyDropDownOptions}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={this.OnSelectedJourney}

            standardDropdownOptions={touchPointOptions}
            selectedStandard={selectedStandard}
            onStandardChange={this.OnSelectedTouchPoint}

            searchText={this.state.searchText}
            onSearchChange={this.SetSearchText}
            onSearchClick={this.OnSearch}
            onClear={this.OnClear}
          />
          <h5 className={styles.brandh5}>{this.props.brandStandardHeading}</h5>
          <div className={styles.bgLight}>
            {!loading &&
              <Tabs>
                <TabList className={styles.categoryFilters}>
                  {
                    tabsData.map(
                      x => {
                        return (<Tab className={tabClass} key={Utility.GetUniqueId()}
                          selectedClassName={styles.categoryFiltersLinkActive}>
                          {x}<span className={styles.categoryFiltersBadge}>{this.GetJourneyCount(x)}</span>
                        </Tab>)
                      }
                    )
                  }
                </TabList>
                {
                  tabsData.map(
                    x => {
                      return (<TabPanel key={Utility.GetUniqueId()}>
                        <BrandStandardsData journeyName={x} brandStandardModel={brandStandardListItems} enableTitle={this.props.enableTitle} />
                      </TabPanel>)
                    }
                  )
                }
              </Tabs>
            }
          </div>
        </div>

      </section>
    );
  }
}
