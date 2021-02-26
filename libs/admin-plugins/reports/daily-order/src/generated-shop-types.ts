// tslint:disable
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type Address = Node & {
   __typename?: 'Address';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  country: Country;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Adjustment = {
   __typename?: 'Adjustment';
  adjustmentSource: Scalars['String'];
  type: AdjustmentType;
  description: Scalars['String'];
  amount: Scalars['Int'];
};

export enum AdjustmentType {
  Tax = 'TAX',
  Promotion = 'PROMOTION',
  Shipping = 'SHIPPING',
  Refund = 'REFUND',
  TaxRefund = 'TAX_REFUND',
  PromotionRefund = 'PROMOTION_REFUND',
  ShippingRefund = 'SHIPPING_REFUND'
}

export type Administrator = Node & {
   __typename?: 'Administrator';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  emailAddress: Scalars['String'];
  user: User;
};

export type AdministratorList = PaginatedList & {
   __typename?: 'AdministratorList';
  items: Array<Administrator>;
  totalItems: Scalars['Int'];
};

export type Asset = Node & {
   __typename?: 'Asset';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  type: AssetType;
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  source: Scalars['String'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
};

export type AssetList = PaginatedList & {
   __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export enum AssetType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY'
}

export type AuthenticationInput = {
  native?: Maybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
   __typename?: 'AuthenticationMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  strategy: Scalars['String'];
};

export type BooleanCustomFieldConfig = CustomField & {
   __typename?: 'BooleanCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
};

export type BooleanOperators = {
  eq?: Maybe<Scalars['Boolean']>;
};

export type Cancellation = Node & StockMovement & {
   __typename?: 'Cancellation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderLine: OrderLine;
};

export type Channel = Node & {
   __typename?: 'Channel';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  token: Scalars['String'];
  defaultTaxZone?: Maybe<Zone>;
  defaultShippingZone?: Maybe<Zone>;
  defaultLanguageCode: LanguageCode;
  currencyCode: CurrencyCode;
  pricesIncludeTax: Scalars['Boolean'];
  shippingMethod: Array<ShippingMethod>;
};

export type Collection = Node & {
   __typename?: 'Collection';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String'];
  slug: Scalars['String'];
  breadcrumbs: Array<CollectionBreadcrumb>;
  position: Scalars['Int'];
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  parent?: Maybe<Collection>;
  children?: Maybe<Array<Collection>>;
  filters: Array<ConfigurableOperation>;
  translations: Array<CollectionTranslation>;
  productVariants: ProductVariantList;
  customFields?: Maybe<Scalars['JSON']>;
};


export type CollectionProductVariantsArgs = {
  options?: Maybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
   __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CollectionFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  slug?: Maybe<StringOperators>;
  position?: Maybe<NumberOperators>;
  description?: Maybe<StringOperators>;
};

export type CollectionList = PaginatedList & {
   __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type CollectionListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CollectionSortParameter>;
  filter?: Maybe<CollectionFilterParameter>;
};

export type CollectionSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  position?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type CollectionTranslation = {
   __typename?: 'CollectionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigArg = {
   __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
   __typename?: 'ConfigArgDefinition';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigurableOperation = {
   __typename?: 'ConfigurableOperation';
  code: Scalars['String'];
  args: Array<ConfigArg>;
};

export type ConfigurableOperationDefinition = {
   __typename?: 'ConfigurableOperationDefinition';
  code: Scalars['String'];
  args: Array<ConfigArgDefinition>;
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  code: Scalars['String'];
  arguments: Array<ConfigArgInput>;
};

export type Contact = Node & {
   __typename?: 'Contact';
  channelId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  sentAt?: Maybe<Scalars['DateTime']>;
  subject: Scalars['String'];
  message: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  author?: Maybe<Customer>;
  authorName: Scalars['String'];
  authorEmail: Scalars['String'];
  authorPhone?: Maybe<Scalars['String']>;
  authorLocation?: Maybe<Scalars['String']>;
  authorIp?: Maybe<Scalars['String']>;
  adminUserId?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  adminNote?: Maybe<Scalars['String']>;
  response?: Maybe<Scalars['String']>;
  responseCreatedAt?: Maybe<Scalars['DateTime']>;
  vendorId?: Maybe<Scalars['Int']>;
  params?: Maybe<Scalars['String']>;
  channels?: Maybe<Channel>;
};

export type ContactDeleteReturn = {
   __typename?: 'ContactDeleteReturn';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type ContactList = PaginatedList & {
   __typename?: 'ContactList';
  items: Array<Contact>;
  totalItems: Scalars['Int'];
};

export type ContactListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Coordinate = {
   __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Country = Node & {
   __typename?: 'Country';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  translations: Array<CountryTranslation>;
};

export type CountryList = PaginatedList & {
   __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
};

export type CountryTranslation = {
   __typename?: 'CountryTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type CreateAddressInput = {
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

export enum CurrencyCode {
  Aed = 'AED',
  Afn = 'AFN',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Ars = 'ARS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azn = 'AZN',
  Bam = 'BAM',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bgn = 'BGN',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Brl = 'BRL',
  Bsd = 'BSD',
  Btn = 'BTN',
  Bwp = 'BWP',
  Byn = 'BYN',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Chf = 'CHF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Crc = 'CRC',
  Cuc = 'CUC',
  Cup = 'CUP',
  Cve = 'CVE',
  Czk = 'CZK',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Egp = 'EGP',
  Ern = 'ERN',
  Etb = 'ETB',
  Eur = 'EUR',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Gbp = 'GBP',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Irr = 'IRR',
  Isk = 'ISK',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Kpw = 'KPW',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Lyd = 'LYD',
  Mad = 'MAD',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mru = 'MRU',
  Mur = 'MUR',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Myr = 'MYR',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nio = 'NIO',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pen = 'PEN',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Pyg = 'PYG',
  Qar = 'QAR',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdg = 'SDG',
  Sek = 'SEK',
  Sgd = 'SGD',
  Shp = 'SHP',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Ssp = 'SSP',
  Stn = 'STN',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjs = 'TJS',
  Tmt = 'TMT',
  Tnd = 'TND',
  Top = 'TOP',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Ugx = 'UGX',
  Usd = 'USD',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Ves = 'VES',
  Vnd = 'VND',
  Vuv = 'VUV',
  Wst = 'WST',
  Xaf = 'XAF',
  Xcd = 'XCD',
  Xof = 'XOF',
  Xpf = 'XPF',
  Yer = 'YER',
  Zar = 'ZAR',
  Zmw = 'ZMW',
  Zwl = 'ZWL'
}

export type CurrentUser = {
   __typename?: 'CurrentUser';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  channels: Array<CurrentUserChannel>;
};

export type CurrentUserChannel = {
   __typename?: 'CurrentUserChannel';
  id: Scalars['ID'];
  token: Scalars['String'];
  code: Scalars['String'];
  permissions: Array<Permission>;
};

export type Customer = Node & {
   __typename?: 'Customer';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  addresses?: Maybe<Array<Address>>;
  orders: OrderList;
  user?: Maybe<User>;
  customFields?: Maybe<Scalars['JSON']>;
};


export type CustomerOrdersArgs = {
  options?: Maybe<OrderListOptions>;
};

export type CustomerFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  title?: Maybe<StringOperators>;
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  phoneNumber?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
};

export type CustomerGroup = Node & {
   __typename?: 'CustomerGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  customers: CustomerList;
};


export type CustomerGroupCustomersArgs = {
  options?: Maybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
   __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int'];
};

export type CustomerListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CustomerSortParameter>;
  filter?: Maybe<CustomerFilterParameter>;
};

export type CustomerSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  phoneNumber?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
};

export type CustomField = {
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
};

export type CustomFieldConfig = StringCustomFieldConfig | LocaleStringCustomFieldConfig | IntCustomFieldConfig | FloatCustomFieldConfig | BooleanCustomFieldConfig | DateTimeCustomFieldConfig;

export type CustomFields = {
   __typename?: 'CustomFields';
  Address: Array<CustomFieldConfig>;
  Collection: Array<CustomFieldConfig>;
  Customer: Array<CustomFieldConfig>;
  Facet: Array<CustomFieldConfig>;
  FacetValue: Array<CustomFieldConfig>;
  GlobalSettings: Array<CustomFieldConfig>;
  Order: Array<CustomFieldConfig>;
  OrderLine: Array<CustomFieldConfig>;
  Product: Array<CustomFieldConfig>;
  ProductOption: Array<CustomFieldConfig>;
  ProductOptionGroup: Array<CustomFieldConfig>;
  ProductVariant: Array<CustomFieldConfig>;
  User: Array<CustomFieldConfig>;
  ShippingMethod: Array<CustomFieldConfig>;
};

export type DateOperators = {
  eq?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
  after?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateRange>;
};

export type DateRange = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
};


export type DateTimeCustomFieldConfig = CustomField & {
   __typename?: 'DateTimeCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['String']>;
  step?: Maybe<Scalars['Int']>;
};

export type DeletionResponse = {
   __typename?: 'DeletionResponse';
  result: DeletionResult;
  message?: Maybe<Scalars['String']>;
};

export enum DeletionResult {
  Deleted = 'DELETED',
  NotDeleted = 'NOT_DELETED'
}

export type Facet = Node & {
   __typename?: 'Facet';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  code: Scalars['String'];
  values: Array<FacetValue>;
  translations: Array<FacetTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FacetList = PaginatedList & {
   __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type FacetResult = {
   __typename?: 'FacetResult';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  facetValues: Array<FacetValueResult>;
};

export type FacetTranslation = {
   __typename?: 'FacetTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetValue = Node & {
   __typename?: 'FacetValue';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  facet: Facet;
  name: Scalars['String'];
  code: Scalars['String'];
  translations: Array<FacetValueTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FacetValueResult = {
   __typename?: 'FacetValueResult';
  facetValue: FacetValue;
  count: Scalars['Int'];
};

export type FacetValueTranslation = {
   __typename?: 'FacetValueTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FloatCustomFieldConfig = CustomField & {
   __typename?: 'FloatCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  step?: Maybe<Scalars['Float']>;
};

export type Fulfillment = Node & {
   __typename?: 'Fulfillment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  orderItems: Array<OrderItem>;
  method: Scalars['String'];
  trackingCode?: Maybe<Scalars['String']>;
};

export type GlobalSettings = {
   __typename?: 'GlobalSettings';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  availableLanguages: Array<LanguageCode>;
  trackInventory: Scalars['Boolean'];
  serverConfig: ServerConfig;
  customFields?: Maybe<GlobalSettingsCustomFields>;
};

export type GlobalSettingsCustomFields = {
   __typename?: 'GlobalSettingsCustomFields';
  receivedEmailAddress?: Maybe<Scalars['String']>;
  enableCaptcha?: Maybe<Scalars['Boolean']>;
  recaptchaSiteKey?: Maybe<Scalars['String']>;
  recaptchaSecretKey?: Maybe<Scalars['String']>;
  enablePhone?: Maybe<Scalars['Boolean']>;
  enableNewsletterFirstName?: Maybe<Scalars['Boolean']>;
  enableNewsletterLastName?: Maybe<Scalars['Boolean']>;
  enableNewsletterPhone?: Maybe<Scalars['Boolean']>;
  enableNewsletterCaptcha?: Maybe<Scalars['Boolean']>;
};

export type HistoryEntry = Node & {
   __typename?: 'HistoryEntry';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  isPublic: Scalars['Boolean'];
  type: HistoryEntryType;
  administrator?: Maybe<Administrator>;
  data: Scalars['JSON'];
};

export type HistoryEntryFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  isPublic?: Maybe<BooleanOperators>;
  type?: Maybe<StringOperators>;
};

export type HistoryEntryList = PaginatedList & {
   __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int'];
};

export type HistoryEntryListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<HistoryEntrySortParameter>;
  filter?: Maybe<HistoryEntryFilterParameter>;
};

export type HistoryEntrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export enum HistoryEntryType {
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  OrderStateTransition = 'ORDER_STATE_TRANSITION',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderFullfillment = 'ORDER_FULLFILLMENT',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderNote = 'ORDER_NOTE',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED'
}

export type ImportInfo = {
   __typename?: 'ImportInfo';
  errors?: Maybe<Array<Scalars['String']>>;
  processed: Scalars['Int'];
  imported: Scalars['Int'];
};

export type IntCustomFieldConfig = CustomField & {
   __typename?: 'IntCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['Int']>;
};


export enum LanguageCode {
  Af = 'af',
  Ak = 'ak',
  Sq = 'sq',
  Am = 'am',
  Ar = 'ar',
  Hy = 'hy',
  As = 'as',
  Az = 'az',
  Bm = 'bm',
  Bn = 'bn',
  Eu = 'eu',
  Be = 'be',
  Bs = 'bs',
  Br = 'br',
  Bg = 'bg',
  My = 'my',
  Ca = 'ca',
  Ce = 'ce',
  Zh = 'zh',
  ZhHans = 'zh_Hans',
  ZhHant = 'zh_Hant',
  Cu = 'cu',
  Kw = 'kw',
  Co = 'co',
  Hr = 'hr',
  Cs = 'cs',
  Da = 'da',
  Nl = 'nl',
  NlBe = 'nl_BE',
  Dz = 'dz',
  En = 'en',
  EnAu = 'en_AU',
  EnCa = 'en_CA',
  EnGb = 'en_GB',
  EnUs = 'en_US',
  Eo = 'eo',
  Et = 'et',
  Ee = 'ee',
  Fo = 'fo',
  Fi = 'fi',
  Fr = 'fr',
  FrCa = 'fr_CA',
  FrCh = 'fr_CH',
  Ff = 'ff',
  Gl = 'gl',
  Lg = 'lg',
  Ka = 'ka',
  De = 'de',
  DeAt = 'de_AT',
  DeCh = 'de_CH',
  El = 'el',
  Gu = 'gu',
  Ht = 'ht',
  Ha = 'ha',
  He = 'he',
  Hi = 'hi',
  Hu = 'hu',
  Is = 'is',
  Ig = 'ig',
  Id = 'id',
  Ia = 'ia',
  Ga = 'ga',
  It = 'it',
  Ja = 'ja',
  Jv = 'jv',
  Kl = 'kl',
  Kn = 'kn',
  Ks = 'ks',
  Kk = 'kk',
  Km = 'km',
  Ki = 'ki',
  Rw = 'rw',
  Ko = 'ko',
  Ku = 'ku',
  Ky = 'ky',
  Lo = 'lo',
  La = 'la',
  Lv = 'lv',
  Ln = 'ln',
  Lt = 'lt',
  Lu = 'lu',
  Lb = 'lb',
  Mk = 'mk',
  Mg = 'mg',
  Ms = 'ms',
  Ml = 'ml',
  Mt = 'mt',
  Gv = 'gv',
  Mi = 'mi',
  Mr = 'mr',
  Mn = 'mn',
  Ne = 'ne',
  Nd = 'nd',
  Se = 'se',
  Nb = 'nb',
  Nn = 'nn',
  Ny = 'ny',
  Or = 'or',
  Om = 'om',
  Os = 'os',
  Ps = 'ps',
  Fa = 'fa',
  FaAf = 'fa_AF',
  Pl = 'pl',
  Pt = 'pt',
  PtBr = 'pt_BR',
  PtPt = 'pt_PT',
  Pa = 'pa',
  Qu = 'qu',
  Ro = 'ro',
  RoMd = 'ro_MD',
  Rm = 'rm',
  Rn = 'rn',
  Ru = 'ru',
  Sm = 'sm',
  Sg = 'sg',
  Sa = 'sa',
  Gd = 'gd',
  Sr = 'sr',
  Sn = 'sn',
  Ii = 'ii',
  Sd = 'sd',
  Si = 'si',
  Sk = 'sk',
  Sl = 'sl',
  So = 'so',
  St = 'st',
  Es = 'es',
  EsEs = 'es_ES',
  EsMx = 'es_MX',
  Su = 'su',
  Sw = 'sw',
  SwCd = 'sw_CD',
  Sv = 'sv',
  Tg = 'tg',
  Ta = 'ta',
  Tt = 'tt',
  Te = 'te',
  Th = 'th',
  Bo = 'bo',
  Ti = 'ti',
  To = 'to',
  Tr = 'tr',
  Tk = 'tk',
  Uk = 'uk',
  Ur = 'ur',
  Ug = 'ug',
  Uz = 'uz',
  Vi = 'vi',
  Vo = 'vo',
  Cy = 'cy',
  Fy = 'fy',
  Wo = 'wo',
  Xh = 'xh',
  Yi = 'yi',
  Yo = 'yo',
  Zu = 'zu'
}

export type LocaleStringCustomFieldConfig = CustomField & {
   __typename?: 'LocaleStringCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  length?: Maybe<Scalars['Int']>;
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
};

export type LocalizedString = {
   __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LoginResult = {
   __typename?: 'LoginResult';
  user: CurrentUser;
};

export type Mutation = {
   __typename?: 'Mutation';
  addItemToOrder?: Maybe<Order>;
  removeOrderLine?: Maybe<Order>;
  removeAllOrderLines?: Maybe<Order>;
  adjustOrderLine?: Maybe<Order>;
  applyCouponCode?: Maybe<Order>;
  removeCouponCode?: Maybe<Order>;
  transitionOrderToState?: Maybe<Order>;
  setOrderShippingAddress?: Maybe<Order>;
  setOrderBillingAddress?: Maybe<Order>;
  setOrderCustomFields?: Maybe<Order>;
  setOrderShippingMethod?: Maybe<Order>;
  addPaymentToOrder?: Maybe<Order>;
  setCustomerForOrder?: Maybe<Order>;
  login: LoginResult;
  authenticate: LoginResult;
  logout: Scalars['Boolean'];
  refreshCustomerVerification: Scalars['Boolean'];
  registerCustomerAccount: Scalars['Boolean'];
  updateCustomer: Customer;
  createCustomerAddress: Address;
  updateCustomerAddress: Address;
  deleteCustomerAddress: Scalars['Boolean'];
  verifyCustomerAccount: LoginResult;
  updateCustomerPassword?: Maybe<Scalars['Boolean']>;
  requestUpdateCustomerEmailAddress?: Maybe<Scalars['Boolean']>;
  updateCustomerEmailAddress?: Maybe<Scalars['Boolean']>;
  requestPasswordReset?: Maybe<Scalars['Boolean']>;
  resetPassword: LoginResult;
  submitProductReview: ProductReview;
  voteOnReview: ProductReview;
  submitContact: Contact;
  submitContactShop: Contact;
  submitSubscriber: Subscriber;
  submitUnSubscriber: Subscriber;
  createVendor?: Maybe<Vendor>;
  createVendorInfo?: Maybe<VendorInfo>;
  createVendorBank?: Maybe<VendorBank>;
  createVendorContact?: Maybe<VendorContact>;
  createVendorMarketingContact?: Maybe<VendorMarketingContact>;
  verifyVendorAccount: VerifyResponse;
  addItemToOrderVendor?: Maybe<Array<Maybe<Order>>>;
  removeOrderVendorLine?: Maybe<Array<Maybe<Order>>>;
  adjustOrderVendorLine?: Maybe<Array<Maybe<Order>>>;
  transitionOrderVendorToState?: Maybe<Array<Maybe<Order>>>;
  setCustomerForOrderVendors?: Maybe<Array<Maybe<Order>>>;
  setOrderVendorShippingAddress?: Maybe<Array<Maybe<Order>>>;
  setOrderVendorBillingAddress?: Maybe<Array<Maybe<Order>>>;
  applyCouponCodeForOrderVendor?: Maybe<Array<Maybe<Order>>>;
  removeCouponCodeForOrderVendor?: Maybe<Array<Maybe<Order>>>;
  setShippingMethodByOrderVendor?: Maybe<Array<Maybe<Order>>>;
  addPaymentToOrderVendors?: Maybe<Array<Maybe<Order>>>;
};


export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
};


export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String'];
};


export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String'];
};


export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String'];
};


export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Scalars['ID'];
};


export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput;
};


export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: Maybe<Scalars['Boolean']>;
};


export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: Maybe<Scalars['Boolean']>;
};


export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String'];
};


export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID'];
};


export type MutationVerifyCustomerAccountArgs = {
  token: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};


export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationRequestUpdateCustomerEmailAddressArgs = {
  password: Scalars['String'];
  newEmailAddress: Scalars['String'];
};


export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSubmitProductReviewArgs = {
  input: SubmitProductReviewInput;
};


export type MutationVoteOnReviewArgs = {
  id: Scalars['ID'];
  vote: Scalars['Boolean'];
};


export type MutationSubmitContactArgs = {
  input: SubmitContactInput;
};


export type MutationSubmitContactShopArgs = {
  input: SubmitContactShopInput;
};


export type MutationSubmitSubscriberArgs = {
  input: SubmitSubscriberInput;
};


export type MutationSubmitUnSubscriberArgs = {
  input: SubmitUnSubscriberInput;
};


export type MutationCreateVendorArgs = {
  input: VendorInput;
};


export type MutationCreateVendorInfoArgs = {
  input: VendorInfoInput;
};


export type MutationCreateVendorBankArgs = {
  input: VendorBankInput;
};


export type MutationCreateVendorContactArgs = {
  input: VendorContactInput;
};


export type MutationCreateVendorMarketingContactArgs = {
  input: VendorMarketingContactInput;
};


export type MutationVerifyVendorAccountArgs = {
  token: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};


export type MutationAddItemToOrderVendorArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
  channelId: Scalars['ID'];
};


export type MutationRemoveOrderVendorLineArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationAdjustOrderVendorLineArgs = {
  orderLineId: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
};


export type MutationTransitionOrderVendorToStateArgs = {
  state: Scalars['String'];
};


export type MutationSetCustomerForOrderVendorsArgs = {
  input: CreateCustomerInput;
};


export type MutationSetOrderVendorShippingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderVendorBillingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationApplyCouponCodeForOrderVendorArgs = {
  orderId: Scalars['ID'];
  couponCode: Scalars['String'];
};


export type MutationRemoveCouponCodeForOrderVendorArgs = {
  orderId: Scalars['ID'];
  couponCode: Scalars['String'];
};


export type MutationSetShippingMethodByOrderVendorArgs = {
  shippingMethodId: Scalars['ID'];
  oderId: Scalars['ID'];
};


export type MutationAddPaymentToOrderVendorsArgs = {
  input: OrderVendorPaymentInput;
};

export type NativeAuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Newsletter = Node & {
   __typename?: 'Newsletter';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  subject?: Maybe<Scalars['String']>;
  customerGroupId?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  template_name?: Maybe<Scalars['String']>;
  templateContent?: Maybe<Scalars['String']>;
  templateCss?: Maybe<Scalars['String']>;
  params?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  type: Scalars['String'];
};

export type NewsletterDeleteReturn = {
   __typename?: 'NewsletterDeleteReturn';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type NewsletterList = PaginatedList & {
   __typename?: 'NewsletterList';
  items: Array<Newsletter>;
  totalItems: Scalars['Int'];
};

export type NewsletterListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type NewsletterQueue = Node & {
   __typename?: 'NewsletterQueue';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  templateId?: Maybe<Scalars['ID']>;
  newsletter_subject?: Maybe<Scalars['String']>;
  newsletter_template_name?: Maybe<Scalars['String']>;
  newsletter_text?: Maybe<Scalars['String']>;
  newsletter_styles?: Maybe<Scalars['String']>;
  newsletter_params?: Maybe<Scalars['String']>;
  queue_status: Scalars['Int'];
  queue_start_at?: Maybe<Scalars['DateTime']>;
  queue_finish_at?: Maybe<Scalars['DateTime']>;
};

export type NewsletterQueueLink = Node & {
   __typename?: 'NewsletterQueueLink';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  subscriber?: Maybe<Subscriber>;
  queue?: Maybe<NewsletterQueue>;
  letter_sent_at?: Maybe<Scalars['DateTime']>;
};

export type NewsletterQueueList = PaginatedList & {
   __typename?: 'NewsletterQueueList';
  items: Array<NewsletterQueue>;
  totalItems: Scalars['Int'];
};

export type NewsletterQueueListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Node = {
  id: Scalars['ID'];
};

export type NumberOperators = {
  eq?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  between?: Maybe<NumberRange>;
};

export type NumberRange = {
  start: Scalars['Float'];
  end: Scalars['Float'];
};

export type Order = Node & {
   __typename?: 'Order';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  state: Scalars['String'];
  active: Scalars['Boolean'];
  customer?: Maybe<Customer>;
  shippingAddress?: Maybe<OrderAddress>;
  billingAddress?: Maybe<OrderAddress>;
  lines: Array<OrderLine>;
  adjustments: Array<Adjustment>;
  couponCodes: Array<Scalars['String']>;
  promotions: Array<Promotion>;
  payments?: Maybe<Array<Payment>>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  totalQuantity: Scalars['Int'];
  subTotalBeforeTax: Scalars['Int'];
  subTotal: Scalars['Int'];
  currencyCode: CurrencyCode;
  shipping: Scalars['Int'];
  shippingWithTax: Scalars['Int'];
  shippingMethod?: Maybe<ShippingMethod>;
  totalBeforeTax: Scalars['Int'];
  total: Scalars['Int'];
  history: HistoryEntryList;
  channel?: Maybe<Channel>;
  customFields?: Maybe<Scalars['JSON']>;
};


export type OrderHistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
   __typename?: 'OrderAddress';
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type OrderFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  active?: Maybe<BooleanOperators>;
  totalQuantity?: Maybe<NumberOperators>;
  subTotalBeforeTax?: Maybe<NumberOperators>;
  subTotal?: Maybe<NumberOperators>;
  currencyCode?: Maybe<StringOperators>;
  shipping?: Maybe<NumberOperators>;
  shippingWithTax?: Maybe<NumberOperators>;
  totalBeforeTax?: Maybe<NumberOperators>;
  total?: Maybe<NumberOperators>;
};

export type OrderItem = Node & {
   __typename?: 'OrderItem';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  cancelled: Scalars['Boolean'];
  unitPrice: Scalars['Int'];
  unitPriceWithTax: Scalars['Int'];
  unitPriceIncludesTax: Scalars['Boolean'];
  taxRate: Scalars['Float'];
  adjustments: Array<Adjustment>;
  fulfillment?: Maybe<Fulfillment>;
  refundId?: Maybe<Scalars['ID']>;
};

export type OrderLine = Node & {
   __typename?: 'OrderLine';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  featuredAsset?: Maybe<Asset>;
  unitPrice: Scalars['Int'];
  unitPriceWithTax: Scalars['Int'];
  quantity: Scalars['Int'];
  items: Array<OrderItem>;
  totalPrice: Scalars['Int'];
  adjustments: Array<Adjustment>;
  order: Order;
  customFields?: Maybe<Scalars['JSON']>;
};

export type OrderList = PaginatedList & {
   __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type OrderListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<OrderSortParameter>;
  filter?: Maybe<OrderFilterParameter>;
};

export type OrderProcessState = {
   __typename?: 'OrderProcessState';
  name: Scalars['String'];
  to: Array<Scalars['String']>;
};

export type OrderSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  totalQuantity?: Maybe<SortOrder>;
  subTotalBeforeTax?: Maybe<SortOrder>;
  subTotal?: Maybe<SortOrder>;
  shipping?: Maybe<SortOrder>;
  shippingWithTax?: Maybe<SortOrder>;
  totalBeforeTax?: Maybe<SortOrder>;
  total?: Maybe<SortOrder>;
};

export type OrderVendorPaymentInput = {
  method: Scalars['String'];
  metadata: Scalars['JSON'];
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

export type Payment = Node & {
   __typename?: 'Payment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  method: Scalars['String'];
  amount: Scalars['Int'];
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  refunds: Array<Refund>;
  metadata?: Maybe<Scalars['JSON']>;
};

export type PaymentInput = {
  method: Scalars['String'];
  metadata: Scalars['JSON'];
};

export type PaymentMethod = Node & {
   __typename?: 'PaymentMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  enabled: Scalars['Boolean'];
  configArgs: Array<ConfigArg>;
  definition: ConfigurableOperationDefinition;
};

export enum Permission {
  Authenticated = 'Authenticated',
  SuperAdmin = 'SuperAdmin',
  Owner = 'Owner',
  Public = 'Public',
  CreateCatalog = 'CreateCatalog',
  ReadCatalog = 'ReadCatalog',
  UpdateCatalog = 'UpdateCatalog',
  DeleteCatalog = 'DeleteCatalog',
  CreateCustomer = 'CreateCustomer',
  ReadCustomer = 'ReadCustomer',
  UpdateCustomer = 'UpdateCustomer',
  DeleteCustomer = 'DeleteCustomer',
  CreateAdministrator = 'CreateAdministrator',
  ReadAdministrator = 'ReadAdministrator',
  UpdateAdministrator = 'UpdateAdministrator',
  DeleteAdministrator = 'DeleteAdministrator',
  CreateOrder = 'CreateOrder',
  ReadOrder = 'ReadOrder',
  UpdateOrder = 'UpdateOrder',
  DeleteOrder = 'DeleteOrder',
  CreatePromotion = 'CreatePromotion',
  ReadPromotion = 'ReadPromotion',
  UpdatePromotion = 'UpdatePromotion',
  DeletePromotion = 'DeletePromotion',
  CreateSettings = 'CreateSettings',
  ReadSettings = 'ReadSettings',
  UpdateSettings = 'UpdateSettings',
  DeleteSettings = 'DeleteSettings'
}

export type PriceRange = {
   __typename?: 'PriceRange';
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type Product = Node & {
   __typename?: 'Product';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  variants: Array<ProductVariant>;
  optionGroups: Array<ProductOptionGroup>;
  facetValues: Array<FacetValue>;
  translations: Array<ProductTranslation>;
  collections: Array<Collection>;
  reviews: ProductReviewList;
  reviewsHistogram: Array<ProductReviewHistogramItem>;
  channel?: Maybe<Channel>;
  customFields?: Maybe<ProductCustomFields>;
};


export type ProductReviewsArgs = {
  options?: Maybe<ProductReviewListOptions>;
};

export type ProductCustomFields = {
   __typename?: 'ProductCustomFields';
  reviewRating?: Maybe<Scalars['Float']>;
  reviewCount?: Maybe<Scalars['Float']>;
  productRecommendationsEnabled?: Maybe<Scalars['Boolean']>;
  isInStock?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  massUnit?: Maybe<Scalars['String']>;
  distanceUnit?: Maybe<Scalars['String']>;
};

export type ProductFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  slug?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
  reviewRating?: Maybe<NumberOperators>;
  reviewCount?: Maybe<NumberOperators>;
  productRecommendationsEnabled?: Maybe<BooleanOperators>;
  isInStock?: Maybe<BooleanOperators>;
  weight?: Maybe<NumberOperators>;
  length?: Maybe<NumberOperators>;
  height?: Maybe<NumberOperators>;
  width?: Maybe<NumberOperators>;
  massUnit?: Maybe<StringOperators>;
  distanceUnit?: Maybe<StringOperators>;
};

export type ProductList = PaginatedList & {
   __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductSortParameter>;
  filter?: Maybe<ProductFilterParameter>;
};

export type ProductOption = Node & {
   __typename?: 'ProductOption';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  groupId: Scalars['ID'];
  group: ProductOptionGroup;
  translations: Array<ProductOptionTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionGroup = Node & {
   __typename?: 'ProductOptionGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionGroupTranslation = {
   __typename?: 'ProductOptionGroupTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductOptionTranslation = {
   __typename?: 'ProductOptionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductRecommendation = {
   __typename?: 'ProductRecommendation';
  product: Product;
  recommendation: Product;
  type: RecommendationType;
};

export type ProductReview = Node & {
   __typename?: 'ProductReview';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  product: Product;
  productVariant?: Maybe<ProductVariant>;
  summary: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  rating: Scalars['Float'];
  author?: Maybe<Customer>;
  authorName: Scalars['String'];
  authorLocation?: Maybe<Scalars['String']>;
  upvotes: Scalars['Int'];
  downvotes: Scalars['Int'];
  state: Scalars['String'];
  response?: Maybe<Scalars['String']>;
  responseCreatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductReviewFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  summary?: Maybe<StringOperators>;
  body?: Maybe<StringOperators>;
  rating?: Maybe<NumberOperators>;
  authorName?: Maybe<StringOperators>;
  authorLocation?: Maybe<StringOperators>;
  upvotes?: Maybe<NumberOperators>;
  downvotes?: Maybe<NumberOperators>;
  state?: Maybe<StringOperators>;
  response?: Maybe<StringOperators>;
  responseCreatedAt?: Maybe<DateOperators>;
};

export type ProductReviewHistogramItem = {
   __typename?: 'ProductReviewHistogramItem';
  bin: Scalars['Int'];
  frequency: Scalars['Int'];
};

export type ProductReviewList = PaginatedList & {
   __typename?: 'ProductReviewList';
  items: Array<ProductReview>;
  totalItems: Scalars['Int'];
};

export type ProductReviewListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductReviewSortParameter>;
  filter?: Maybe<ProductReviewFilterParameter>;
};

export type ProductReviewSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  summary?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
  rating?: Maybe<SortOrder>;
  authorName?: Maybe<SortOrder>;
  authorLocation?: Maybe<SortOrder>;
  upvotes?: Maybe<SortOrder>;
  downvotes?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  response?: Maybe<SortOrder>;
  responseCreatedAt?: Maybe<SortOrder>;
};

export type ProductSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  reviewRating?: Maybe<SortOrder>;
  reviewCount?: Maybe<SortOrder>;
  productRecommendationsEnabled?: Maybe<SortOrder>;
  isInStock?: Maybe<SortOrder>;
  weight?: Maybe<SortOrder>;
  length?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
  massUnit?: Maybe<SortOrder>;
  distanceUnit?: Maybe<SortOrder>;
};

export type ProductTranslation = {
   __typename?: 'ProductTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
};

export type ProductVariant = Node & {
   __typename?: 'ProductVariant';
  id: Scalars['ID'];
  product: Product;
  productId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  sku: Scalars['String'];
  name: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  price: Scalars['Int'];
  currencyCode: CurrencyCode;
  priceIncludesTax: Scalars['Boolean'];
  priceWithTax: Scalars['Int'];
  taxRateApplied: TaxRate;
  taxCategory: TaxCategory;
  options: Array<ProductOption>;
  facetValues: Array<FacetValue>;
  translations: Array<ProductVariantTranslation>;
  customFields?: Maybe<ProductVariantCustomFields>;
};

export type ProductVariantCustomFields = {
   __typename?: 'ProductVariantCustomFields';
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type ProductVariantFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  sku?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  price?: Maybe<NumberOperators>;
  currencyCode?: Maybe<StringOperators>;
  priceIncludesTax?: Maybe<BooleanOperators>;
  priceWithTax?: Maybe<NumberOperators>;
  tierPriceEnabled?: Maybe<BooleanOperators>;
  shippingPrice?: Maybe<NumberOperators>;
  shippingBusinessPrice?: Maybe<NumberOperators>;
};

export type ProductVariantList = PaginatedList & {
   __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
};

export type ProductVariantListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductVariantSortParameter>;
  filter?: Maybe<ProductVariantFilterParameter>;
};

export type ProductVariantSortParameter = {
  id?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  sku?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  priceWithTax?: Maybe<SortOrder>;
  tierPriceEnabled?: Maybe<SortOrder>;
  shippingPrice?: Maybe<SortOrder>;
  shippingBusinessPrice?: Maybe<SortOrder>;
};

export type ProductVariantTranslation = {
   __typename?: 'ProductVariantTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type Promotion = Node & {
   __typename?: 'Promotion';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  conditions: Array<ConfigurableOperation>;
  actions: Array<ConfigurableOperation>;
};

export type PromotionList = PaginatedList & {
   __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  activeChannel: Channel;
  activeCustomer?: Maybe<Customer>;
  activeOrder?: Maybe<Order>;
  availableCountries: Array<Country>;
  collections: CollectionList;
  collection?: Maybe<Collection>;
  eligibleShippingMethods: Array<ShippingMethodQuote>;
  me?: Maybe<CurrentUser>;
  nextOrderStates: Array<Scalars['String']>;
  order?: Maybe<Order>;
  orderByCode?: Maybe<Order>;
  product?: Maybe<Product>;
  products: ProductList;
  search: SearchResponse;
  productRecommendations: Array<ProductRecommendation>;
  productTierPrices: Array<TierPrice>;
  generateBraintreeClientToken: Scalars['String'];
  generatePayumoneyClientToken: Array<Maybe<Scalars['String']>>;
  activeOrderVendors?: Maybe<Array<Maybe<Order>>>;
  getVendorByBrand?: Maybe<Vendor>;
  getVendorByEmail?: Maybe<Vendor>;
  eligibleVendorShippingMethods: Array<ShippingMethodQuote>;
};


export type QueryCollectionsArgs = {
  options?: Maybe<CollectionListOptions>;
};


export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrderByCodeArgs = {
  code: Scalars['String'];
};


export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  options?: Maybe<ProductListOptions>;
};


export type QuerySearchArgs = {
  input: SearchInput;
};


export type QueryProductRecommendationsArgs = {
  productId: Scalars['ID'];
};


export type QueryProductTierPricesArgs = {
  productId: Scalars['ID'];
};


export type QueryGenerateBraintreeClientTokenArgs = {
  orderId: Scalars['ID'];
};


export type QueryGeneratePayumoneyClientTokenArgs = {
  orderId: Scalars['ID'];
};


export type QueryGetVendorByBrandArgs = {
  brand: Scalars['String'];
};


export type QueryGetVendorByEmailArgs = {
  email: Scalars['String'];
};


export type QueryEligibleVendorShippingMethodsArgs = {
  id: Scalars['ID'];
};

export enum RecommendationType {
  Crosssell = 'CROSSSELL',
  Upsell = 'UPSELL',
  Related = 'RELATED'
}

export type Refund = Node & {
   __typename?: 'Refund';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  items: Scalars['Int'];
  shipping: Scalars['Int'];
  adjustment: Scalars['Int'];
  total: Scalars['Int'];
  method?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  orderItems: Array<OrderItem>;
  paymentId: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type RegisterCustomerInput = {
  emailAddress: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Return = Node & StockMovement & {
   __typename?: 'Return';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderItem: OrderItem;
};

export type Role = Node & {
   __typename?: 'Role';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
  channels: Array<Channel>;
};

export type RoleList = PaginatedList & {
   __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type Sale = Node & StockMovement & {
   __typename?: 'Sale';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderLine: OrderLine;
};

export type SearchInput = {
  term?: Maybe<Scalars['String']>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  facetValueOperator?: Maybe<LogicalOperator>;
  collectionId?: Maybe<Scalars['ID']>;
  collectionSlug?: Maybe<Scalars['String']>;
  groupByProduct?: Maybe<Scalars['Boolean']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<SearchResultSortParameter>;
  channelCode?: Maybe<Scalars['String']>;
};

export type SearchReindexResponse = {
   __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
   __typename?: 'SearchResponse';
  items: Array<SearchResult>;
  totalItems: Scalars['Int'];
  facetValues: Array<FacetValueResult>;
  facets?: Maybe<Array<Maybe<FacetResult>>>;
};

export type SearchResult = {
   __typename?: 'SearchResult';
  sku: Scalars['String'];
  slug: Scalars['String'];
  productId: Scalars['ID'];
  productName: Scalars['String'];
  /** @deprecated Use `productAsset.preview` instead */
  productPreview: Scalars['String'];
  productAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  /** @deprecated Use `productVariantAsset.preview` instead */
  productVariantPreview: Scalars['String'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  currencyCode: CurrencyCode;
  description: Scalars['String'];
  facetIds: Array<Scalars['ID']>;
  facetValueIds: Array<Scalars['ID']>;
  collectionIds: Array<Scalars['ID']>;
  score: Scalars['Float'];
};

export type SearchResultAsset = {
   __typename?: 'SearchResultAsset';
  id: Scalars['ID'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
};

export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
};

export type ServerConfig = {
   __typename?: 'ServerConfig';
  orderProcess: Array<OrderProcessState>;
  permittedAssetTypes: Array<Scalars['String']>;
  customFieldConfig: CustomFields;
};

export type ShippingMethod = Node & {
   __typename?: 'ShippingMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  description: Scalars['String'];
  checker: ConfigurableOperation;
  calculator: ConfigurableOperation;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodList = PaginatedList & {
   __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodQuote = {
   __typename?: 'ShippingMethodQuote';
  id: Scalars['ID'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  description: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type SinglePrice = {
   __typename?: 'SinglePrice';
  value: Scalars['Int'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StockAdjustment = Node & StockMovement & {
   __typename?: 'StockAdjustment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
};

export type StockMovement = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
};

export type StockMovementItem = StockAdjustment | Sale | Cancellation | Return;

export type StockMovementList = {
   __typename?: 'StockMovementList';
  items: Array<StockMovementItem>;
  totalItems: Scalars['Int'];
};

export enum StockMovementType {
  Adjustment = 'ADJUSTMENT',
  Sale = 'SALE',
  Cancellation = 'CANCELLATION',
  Return = 'RETURN'
}

export type StringCustomFieldConfig = CustomField & {
   __typename?: 'StringCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  length?: Maybe<Scalars['Int']>;
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  options?: Maybe<Array<StringFieldOption>>;
};

export type StringFieldOption = {
   __typename?: 'StringFieldOption';
  value: Scalars['String'];
  label?: Maybe<Array<LocalizedString>>;
};

export type StringOperators = {
  eq?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
};

export type SubmitContactInput = {
  channelId?: Maybe<Scalars['Int']>;
  customerId?: Maybe<Scalars['ID']>;
  subject: Scalars['String'];
  authorName: Scalars['String'];
  authorEmail: Scalars['String'];
  message: Scalars['String'];
  authorLocation?: Maybe<Scalars['String']>;
  authorPhone?: Maybe<Scalars['String']>;
  captcha?: Maybe<Scalars['String']>;
  authorIp?: Maybe<Scalars['String']>;
};

export type SubmitContactShopInput = {
  channelId?: Maybe<Scalars['Int']>;
  customerId?: Maybe<Scalars['ID']>;
  subject: Scalars['String'];
  authorName: Scalars['String'];
  authorEmail: Scalars['String'];
  message: Scalars['String'];
  authorLocation?: Maybe<Scalars['String']>;
  authorPhone?: Maybe<Scalars['String']>;
  captcha?: Maybe<Scalars['String']>;
  authorIp?: Maybe<Scalars['String']>;
};

export type SubmitProductReviewInput = {
  productId: Scalars['ID'];
  variantId?: Maybe<Scalars['ID']>;
  customerId?: Maybe<Scalars['ID']>;
  summary: Scalars['String'];
  body: Scalars['String'];
  rating: Scalars['Float'];
  authorName: Scalars['String'];
  authorLocation?: Maybe<Scalars['String']>;
};

export type SubmitSubscriberInput = {
  customerId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  captcha?: Maybe<Scalars['String']>;
};

export type SubmitUnSubscriberInput = {
  token: Scalars['String'];
};

export type Subscriber = Node & {
   __typename?: 'Subscriber';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  subscriberToken?: Maybe<Scalars['String']>;
  author?: Maybe<Customer>;
  customerFirstName?: Maybe<Scalars['String']>;
  customerLastName?: Maybe<Scalars['String']>;
  customerPhone?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  type: Scalars['String'];
};

export type SubscriberList = PaginatedList & {
   __typename?: 'SubscriberList';
  items: Array<Subscriber>;
  totalItems: Scalars['Int'];
};

export type SubscriberListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type TaxCategory = Node & {
   __typename?: 'TaxCategory';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
};

export type TaxRate = Node & {
   __typename?: 'TaxRate';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  value: Scalars['Float'];
  category: TaxCategory;
  zone: Zone;
  customerGroup?: Maybe<CustomerGroup>;
};

export type TaxRateList = PaginatedList & {
   __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int'];
};

export type TierPrice = {
   __typename?: 'TierPrice';
  productVariant: ProductVariant;
  quantity: Scalars['Int'];
  price: Scalars['Float'];
};

export type UpdateAddressInput = {
  id: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateOrderInput = {
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateVendorBankInput = {
  id: Scalars['ID'];
  account: Scalars['String'];
  code: Scalars['String'];
  address: Scalars['String'];
  type: VendorAccountType;
  isCheck?: Maybe<Scalars['String']>;
};

export type UpdateVendorContactInput = {
  id: Scalars['ID'];
  contactName: Scalars['String'];
  pickupAddress: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
};

export type UpdateVendorInfoInput = {
  id: Scalars['ID'];
  brandName: Scalars['String'];
  regAddress: Scalars['String'];
  panno: Scalars['String'];
  GSTINID: Scalars['String'];
  state: Scalars['String'];
  ADHAR: Scalars['String'];
  aboutUs: Scalars['String'];
  staffEmail: Scalars['String'];
  phone: Scalars['String'];
  currencyCode?: Maybe<Scalars['String']>;
  defaultTaxZoneId?: Maybe<Scalars['Int']>;
  defaultShippingZoneId?: Maybe<Scalars['Int']>;
};

export type UpdateVendorInput = {
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  GSTINID: Scalars['String'];
  state: Scalars['String'];
  ownerName: Scalars['String'];
  ownerEmail: Scalars['String'];
};

export type UpdateVendorMarketingInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  emailAddress: Scalars['String'];
  phone: Scalars['String'];
};


export type User = Node & {
   __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  identifier: Scalars['String'];
  verified: Scalars['Boolean'];
  roles: Array<Role>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  authenticationMethods: Array<AuthenticationMethod>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Vendor = Node & {
   __typename?: 'Vendor';
  id: Scalars['ID'];
  channel: Channel;
  user: User;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  GSTINID?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  ownerName?: Maybe<Scalars['String']>;
  ownerEmail?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  banks: Array<VendorBank>;
  contacts: Array<VendorContact>;
  info: Array<VendorInfo>;
  marketing: Array<VendorMarketingContact>;
};

export enum VendorAccountType {
  Current = 'CURRENT',
  Saving = 'SAVING'
}

export type VendorBank = Node & {
   __typename?: 'VendorBank';
  id: Scalars['ID'];
  account?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  type?: Maybe<VendorAccountType>;
  isCheck?: Maybe<Scalars['String']>;
};

export type VendorBankInput = {
  vendorId: Scalars['String'];
  account: Scalars['String'];
  code: Scalars['String'];
  address: Scalars['String'];
  type: VendorAccountType;
  isCheck?: Maybe<Scalars['String']>;
};

export type VendorContact = Node & {
   __typename?: 'VendorContact';
  id: Scalars['ID'];
  contactName?: Maybe<Scalars['String']>;
  pickupAddress?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  postalCode: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
};

export type VendorContactInput = {
  vendorId: Scalars['String'];
  contactName: Scalars['String'];
  pickupAddress: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
};

export type VendorInfo = Node & {
   __typename?: 'VendorInfo';
  id: Scalars['ID'];
  brandName: Scalars['String'];
  regAddress: Scalars['String'];
  panno: Scalars['String'];
  GSTINID: Scalars['String'];
  state: Scalars['String'];
  ADHAR: Scalars['String'];
  aboutUs: Scalars['String'];
  staffEmail: Scalars['String'];
  phone: Scalars['String'];
  currencyCode?: Maybe<Scalars['String']>;
  defaultTaxZoneId?: Maybe<Scalars['Int']>;
  defaultShippingZoneId?: Maybe<Scalars['Int']>;
};

export type VendorInfoInput = {
  vendorId: Scalars['String'];
  brandName: Scalars['String'];
  regAddress: Scalars['String'];
  panno: Scalars['String'];
  GSTINID: Scalars['String'];
  state: Scalars['String'];
  ADHAR: Scalars['String'];
  aboutUs: Scalars['String'];
  staffEmail: Scalars['String'];
  phone: Scalars['String'];
  currencyCode?: Maybe<Scalars['String']>;
  defaultTaxZoneId?: Maybe<Scalars['Int']>;
  defaultShippingZoneId?: Maybe<Scalars['Int']>;
};

export type VendorInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  GSTINID: Scalars['String'];
  state: Scalars['String'];
  ownerName: Scalars['String'];
  ownerEmail: Scalars['String'];
  countryCode?: Maybe<Scalars['String']>;
};

export type VendorList = PaginatedList & {
   __typename?: 'VendorList';
  items: Array<Vendor>;
  totalItems: Scalars['Int'];
};

export type VendorMarketingContact = Node & {
   __typename?: 'VendorMarketingContact';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type VendorMarketingContactInput = {
  vendorId: Scalars['String'];
  name: Scalars['String'];
  emailAddress: Scalars['String'];
  phone: Scalars['String'];
};

export type VerifyResponse = {
   __typename?: 'VerifyResponse';
  result: VerifyResult;
  message?: Maybe<Scalars['String']>;
};

export enum VerifyResult {
  Success = 'SUCCESS',
  Fail = 'FAIL'
}

export type Zone = Node & {
   __typename?: 'Zone';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  members: Array<Country>;
};

