import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IODataList } from '@microsoft/sp-odata-types';
import * as strings from 'RotanabrandstandardWebPartStrings';
import Rotanabrandstandard from './components/Rotanabrandstandard';
import { IRotanabrandstandardProps } from './components/IRotanabrandstandardProps';
import { dropDowns, textFields } from './IRotanaStandardWebpartFields';
import { ISPHelper } from '../../services/ISPHelper';
import { IRotanaBrandStandardWebPartProps } from './IRotanaBrandStandardWebPartProps';
import { BrandPageConstants, ListNames } from '../../models/SPConstants';
import { SPHelpers } from '../../services/SPHelper';


export default class RotanabrandstandardWebPart extends BaseClientSideWebPart<IRotanaBrandStandardWebPartProps> {
  private dropdownOptions: IPropertyPaneDropdownOption[];
  private spHelper: ISPHelper;
  public render(): void {
    const element: React.ReactElement<IRotanabrandstandardProps> = React.createElement(
      Rotanabrandstandard,
      {
        webpartContext: this.context,
        spHelper: this.spHelper,
        bannerImgURL: this.properties.bannerImgURL ?? this.previewImageUrl,
        bannerImgURL2: this.properties.bannerImgURL2 ?? this.previewImageUrl,
        brands: this.properties.brands ?? ListNames.Brands,
        departments: this.properties.departments ?? ListNames.Departments,
        standards: this.properties.standards ?? ListNames.Standards,
        configListName: this.properties.configListName ?? ListNames.ConfigurationList,
        brandStandardHeading: this.properties.brandStandardHeading ?? BrandPageConstants.brandStandardHeading,
        brandStandards: this.properties.brandStandards ?? ListNames.BrandStandards,
        enableTitle:this.properties.enableTitle ?? false
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private async fetchOptions(): Promise<IPropertyPaneDropdownOption[]> {
    const url = this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$select=Title,Id&$filter=Hidden eq false`;
    const response = await this.spHelper.getListData(url);
    const options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    response.value.map((list: IODataList) => {
      options.push({ key: list.Title, text: list.Title });
    });
    return options;
  }
  protected async onInit(): Promise<void> {
    this.spHelper = new SPHelpers(this.context.spHttpClient);
    const options = await this.fetchOptions();
    this.dropdownOptions = options;
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (newValue) {
      switch (propertyPath) {
        case 'configListName': this.properties.configListName = newValue; break;
        case 'brands': this.properties.brands = newValue; break;
        case 'departments': this.properties.departments = newValue; break;
        case 'standards': this.properties.standards = newValue; break;
        case 'brandStandards' : this.properties.brandStandards = newValue; break;
        case 'bannerImgURL': this.properties.bannerImgURL = newValue; break;
      }
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      // re-render the web part as clearing the loading indicator removes the web part body
      this.render();
    }
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const dropdownOptions = this.dropdownOptions ?? [];
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                ...dropDowns.map(field =>
                  PropertyPaneDropdown(field.key, {
                    label: field.label,
                    options: [...dropdownOptions]
                  })
                ),
                ...textFields.map(field =>
                  PropertyPaneTextField(field.key, {
                    label: field.label,
                    value: field.value,
                    placeholder: field.placeholder
                  })
                ),
                PropertyPaneToggle('enableTitle',{
                  onText:'Add the title in a view',
                  offText:'Disable the title from a view'                  
                })
              ]
            }
          ]
        }
      ]
    };
  }


}
