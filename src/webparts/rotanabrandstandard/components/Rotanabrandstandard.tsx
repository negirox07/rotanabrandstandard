import * as React from 'react';
import styles from './Rotanabrandstandard.module.scss';
import { IRotanabrandstandardProps } from './IRotanabrandstandardProps';
import { IRotanaBrandStandardState } from './IRotanaBrandStandardState';
import { LogDetails } from '../../../models/LogDetails';
import { toMultiDropdownOptions } from '../../../services/DepartmentHelper';
import { BrandPageConstants } from '../../../models/SPConstants';
import { decryptQuery } from '../../../services/CryptoHelper';
import { Utility } from '../../../services/Utility';
import { BrandDTO } from '../../../models/BrandModel';
import { ConfigItem } from '../../../models/ConfigModel';
import BannerSection from './banner/BannerSection';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
/* import { RotanaMultiSelect } from './dropdowns/RotanaMultiSelect';
import { IReusableMultiSelectOption } from './dropdowns/IReusableSelectProps'; */
import BrandCard from './brand/SelectedBrandCard';
import FilterBar from './filters/FilterBar';

export default class Rotanabrandstandard extends React.Component<IRotanabrandstandardProps, IRotanaBrandStandardState> {
  private readonly LOG_SOURCE = "📝 RotanaBrandStandard";
  private readonly bannerId = `banner_${Math.random().toString(36).substring(2, 15)}`;
  constructor(props: IRotanabrandstandardProps) {
    super(props);
    this.state = {
      configItems: [],
      brandListItems: [],
      departMentListItems: [],
      standardListItems: [],
      brandDropdownOptions: [],
      departmentDropdownOptions: [],
      standardDropdownOptions: [],
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
  }
  async componentDidMount(): Promise<void> {
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    const { spHelper, webpartContext, configListName, brands, departments, standards } =
      this.props;
    try {
      const baseUrl = webpartContext.pageContext.web.absoluteUrl;

      const endpoints = [
        `/_api/web/lists/getbytitle('${configListName}')/items?$top=4999&$select=Title,ConfigValue`,
        `/_api/web/lists/getbytitle('${brands}')/items?$top=4999&$select=Title,*`,
        `/_api/web/lists/getbytitle('${departments}')/items?$top=4999&$select=Title,*`,
        `/_api/web/lists/getbytitle('${standards}')/items?$top=4999&$select=Title,*`,
      ];

      const [configRes, brandsRes, departmentsRes, standardsRes] = await Promise.all(
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

      this.setState({
        configItems,
        brandListItems: brandsRes || [],
        departMentListItems: departmentsRes || [],
        standardListItems: standardsRes || [],
        brandDropdownOptions: toMultiDropdownOptions(brandsRes),
        departmentDropdownOptions: toMultiDropdownOptions(departmentsRes),
        standardDropdownOptions: toMultiDropdownOptions(standardsRes),
        bannerTitle: getConfigValue(BrandPageConstants.LandingPageBannerTitle),
        bannerDescription: getConfigValue(BrandPageConstants.LandingPageBannerDescription),
        hotelsTitle: getConfigValue(BrandPageConstants.LandingPageHotelsTitle),
        hotelsDescription: getConfigValue(BrandPageConstants.LandingPageHotelsDescription),
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
  public render(): React.ReactElement<IRotanabrandstandardProps> {
    const {
      configItems,
      bannerTitle,
      bannerDescription,
      loading,
      brandDropdownOptions,
      departmentDropdownOptions,
      standardDropdownOptions,
      selectedBrand,
      selectedDepartment,
      selectedStandard,
      selectedBrandObj
    } = this.state;
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
          {/*    {this.renderFilterDropDownsAndTextBox(brandDropdownOptions, selectedBrand, departmentDropdownOptions, selectedDepartment, standardDropdownOptions, selectedStandard)}
          */}
          <FilterBar
            brandDropdownOptions={brandDropdownOptions}
            selectedBrand={selectedBrand}
            onBrandChange={(value) => this.setState({ selectedBrand: value })}

            departmentDropdownOptions={departmentDropdownOptions}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={(value) => this.setState({ selectedDepartment: value })}

            standardDropdownOptions={standardDropdownOptions}
            selectedStandard={selectedStandard}
            onStandardChange={(value) => this.setState({ selectedStandard: value })}

            searchText={this.state.searchText}
            onSearchChange={(value) => this.setState({ searchText: value })}
            onSearchClick={() => console.log("Search clicked")}
          />
          <h5 className={styles.brandh5}>{this.props.brandStandardHeading}</h5>
          <div className={styles.bgLight}>
            <nav className={styles.categoryFilters}>
              <a href="#" className={styles.categoryFiltersLink + ' ' + styles.categoryFiltersLinkActive}>All <span>85</span></a>
              <a href="#" className={styles.categoryFiltersLink}>Housekeeping <span className={styles.categoryFiltersBadge}>15</span></a>
            </nav>
          </div>
        </div>

      </section>
    );
  }

  /*   private renderFilterDropDownsAndTextBox(
      brandDropdownOptions: IReusableMultiSelectOption[],
      selectedBrand: string,
      departmentDropdownOptions: IReusableMultiSelectOption[],
      selectedDepartment: string[],
      standardDropdownOptions: IReusableMultiSelectOption[],
      selectedStandard: string
    ): React.ReactNode {
      return (
        <div className={styles.filterContainer}>
          <div className={styles.dropDownContainers}>
  
            <RotanaMultiSelect
              label="Brand"
              options={brandDropdownOptions}
              multiSelect={false}
              selectedKeys={selectedBrand || ""}
              onChange={(value) => this.setState({ selectedBrand: value as string })}
            />
          </div>
          <div className={styles.dropDownContainers}>
            <RotanaMultiSelect
              label="Department"
              options={departmentDropdownOptions}
              multiSelect={true}
              selectedKeys={selectedDepartment}
              onChange={(value) =>
                this.setState({ selectedDepartment: value as string[] })
              }
            />
          </div>
          <div className={styles.dropDownContainers}>
            <RotanaMultiSelect
              label="Standard"
              options={standardDropdownOptions}
              multiSelect={false}
              selectedKeys={selectedStandard}
              onChange={(value) => this.setState({ selectedStandard: value as string })}
            />
          </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchBox}
              placeholder="Search"
            />
            <button className={styles.searchButton} />
          </div>
        </div>
      );
    } */

}
