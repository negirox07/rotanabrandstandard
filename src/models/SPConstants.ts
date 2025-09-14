export const ListNames = {
  ConfigurationList: 'ConfigurationList',
  HotelDetails: 'HotelDetails',
  Brands: 'Brand',
  Departments: 'Department',
  Standards: 'Standard',
  LogList: 'Rotana Log Details',
}
export const BrandPageConstants = {
  Brands: 'Brands',
  Departments: 'Departments',
  Standards: 'Standards',
  StandardsLimit: 400,
  ReidrectPage:'BrandStandardPortal.aspx',
  LandingPageBannerTitle: 'LandingPageBannerTitle',
  LandingPageBannerDescription: 'LandingPageBannerDescription',
  LandingPageHotelsTitle: 'LandingPageHotelsTitle',
  LandingPageHotelsDescription: 'LandingPageHotelsDescription',
  brandStandardHeading: "Brand Standards"
}
export const ToastrSettings = {
  WithButton: {
    "positionClass": 'toast-top-full-width',
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": false,
    "showDuration": "0",
    "hideDuration": "300",
    "timeOut": "5000",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  },
  AutoHide: {
    positionClass: "toast-top-full-width",
    hideDuration: 300,
    timeOut: 3000,
  }
}

export const postheaders = {
  headers: {
    'Accept': 'application/json;odata=nometadata',
    'Content-type': 'application/json;odata=nometadata',
    'odata-version': ''
  },
  body: ''
};
export const putHeaders = {
  headers: {
    'Accept': 'application/json;odata=nometadata',
    'Content-type': 'application/json;odata=nometadata',
    'odata-version': '',
    'IF-MATCH': '*',
    'X-HTTP-Method': 'MERGE'
  },
  body: ''
}