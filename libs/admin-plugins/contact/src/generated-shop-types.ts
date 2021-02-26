// tslint:disable
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type Address = Node & {
   __typename?: 'Address',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  fullName?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  streetLine1: Scalars['String'],
  streetLine2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  province?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  country: Country,
  phoneNumber?: Maybe<Scalars['String']>,
  defaultShippingAddress?: Maybe<Scalars['Boolean']>,
  defaultBillingAddress?: Maybe<Scalars['Boolean']>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type Adjustment = {
   __typename?: 'Adjustment',
  adjustmentSource: Scalars['String'],
  type: AdjustmentType,
  description: Scalars['String'],
  amount: Scalars['Int'],
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
   __typename?: 'Administrator',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  emailAddress: Scalars['String'],
  user: User,
};

export type AdministratorList = PaginatedList & {
   __typename?: 'AdministratorList',
  items: Array<Administrator>,
  totalItems: Scalars['Int'],
};

export type Asset = Node & {
   __typename?: 'Asset',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  type: AssetType,
  fileSize: Scalars['Int'],
  mimeType: Scalars['String'],
  width: Scalars['Int'],
  height: Scalars['Int'],
  source: Scalars['String'],
  preview: Scalars['String'],
  focalPoint?: Maybe<Coordinate>,
};

export type AssetList = PaginatedList & {
   __typename?: 'AssetList',
  items: Array<Asset>,
  totalItems: Scalars['Int'],
};

export enum AssetType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY'
}

export type AuthenticationInput = {
  native?: Maybe<NativeAuthInput>,
};

export type AuthenticationMethod = Node & {
   __typename?: 'AuthenticationMethod',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  strategy: Scalars['String'],
};

export type BooleanCustomFieldConfig = CustomField & {
   __typename?: 'BooleanCustomFieldConfig',
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
};

export type BooleanOperators = {
  eq?: Maybe<Scalars['Boolean']>,
};

export type Cancellation = Node & StockMovement & {
   __typename?: 'Cancellation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  productVariant: ProductVariant,
  type: StockMovementType,
  quantity: Scalars['Int'],
  orderLine: OrderLine,
};

export type Channel = Node & {
   __typename?: 'Channel',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  code: Scalars['String'],
  token: Scalars['String'],
  defaultTaxZone?: Maybe<Zone>,
  defaultShippingZone?: Maybe<Zone>,
  defaultLanguageCode: LanguageCode,
  currencyCode: CurrencyCode,
  pricesIncludeTax: Scalars['Boolean'],
  shippingMethod: Array<ShippingMethod>,
};

export type Collection = Node & {
   __typename?: 'Collection',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode?: Maybe<LanguageCode>,
  name: Scalars['String'],
  slug: Scalars['String'],
  breadcrumbs: Array<CollectionBreadcrumb>,
  position: Scalars['Int'],
  description: Scalars['String'],
  featuredAsset?: Maybe<Asset>,
  assets: Array<Asset>,
  parent?: Maybe<Collection>,
  children?: Maybe<Array<Collection>>,
  filters: Array<ConfigurableOperation>,
  translations: Array<CollectionTranslation>,
  productVariants: ProductVariantList,
  customFields?: Maybe<Scalars['JSON']>,
};


export type CollectionProductVariantsArgs = {
  options?: Maybe<ProductVariantListOptions>
};

export type CollectionBreadcrumb = {
   __typename?: 'CollectionBreadcrumb',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
};

export type CollectionFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  languageCode?: Maybe<StringOperators>,
  name?: Maybe<StringOperators>,
  slug?: Maybe<StringOperators>,
  position?: Maybe<NumberOperators>,
  description?: Maybe<StringOperators>,
};

export type CollectionList = PaginatedList & {
   __typename?: 'CollectionList',
  items: Array<Collection>,
  totalItems: Scalars['Int'],
};

export type CollectionListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<CollectionSortParameter>,
  filter?: Maybe<CollectionFilterParameter>,
};

export type CollectionSortParameter = {
  id?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  name?: Maybe<SortOrder>,
  slug?: Maybe<SortOrder>,
  position?: Maybe<SortOrder>,
  description?: Maybe<SortOrder>,
};

export type CollectionTranslation = {
   __typename?: 'CollectionTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
  slug: Scalars['String'],
  description: Scalars['String'],
};

export type ConfigArg = {
   __typename?: 'ConfigArg',
  name: Scalars['String'],
  type: Scalars['String'],
  value: Scalars['String'],
};

export type ConfigArgDefinition = {
   __typename?: 'ConfigArgDefinition',
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  config?: Maybe<Scalars['JSON']>,
};

export type ConfigArgInput = {
  name: Scalars['String'],
  type: Scalars['String'],
  value: Scalars['String'],
};

export type ConfigurableOperation = {
   __typename?: 'ConfigurableOperation',
  code: Scalars['String'],
  args: Array<ConfigArg>,
};

export type ConfigurableOperationDefinition = {
   __typename?: 'ConfigurableOperationDefinition',
  code: Scalars['String'],
  args: Array<ConfigArgDefinition>,
  description: Scalars['String'],
};

export type ConfigurableOperationInput = {
  code: Scalars['String'],
  arguments: Array<ConfigArgInput>,
};

export type Contact = Node & {
   __typename?: 'Contact',
  channelId?: Maybe<Scalars['Int']>,
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  sentAt?: Maybe<Scalars['DateTime']>,
  subject: Scalars['String'],
  message: Scalars['String'],
  body?: Maybe<Scalars['String']>,
  author?: Maybe<Customer>,
  authorName: Scalars['String'],
  authorEmail: Scalars['String'],
  authorPhone?: Maybe<Scalars['String']>,
  authorLocation?: Maybe<Scalars['String']>,
  authorIp?: Maybe<Scalars['String']>,
  adminUserId?: Maybe<Scalars['Int']>,
  error?: Maybe<Scalars['String']>,
  tags?: Maybe<Scalars['String']>,
  state: Scalars['String'],
  adminNote?: Maybe<Scalars['String']>,
  response?: Maybe<Scalars['String']>,
  responseCreatedAt?: Maybe<Scalars['DateTime']>,
  vendorId?: Maybe<Scalars['Int']>,
  params?: Maybe<Scalars['String']>,
  channels?: Maybe<Channel>,
};

export type ContactDeleteReturn = {
   __typename?: 'ContactDeleteReturn',
  error?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
};

export type ContactList = PaginatedList & {
   __typename?: 'ContactList',
  items: Array<Contact>,
  totalItems: Scalars['Int'],
};

export type ContactListOptions = {
  skip: Scalars['Int'],
  take: Scalars['Int'],
};

export type Coordinate = {
   __typename?: 'Coordinate',
  x: Scalars['Float'],
  y: Scalars['Float'],
};

export type Country = Node & {
   __typename?: 'Country',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  code: Scalars['String'],
  name: Scalars['String'],
  enabled: Scalars['Boolean'],
  translations: Array<CountryTranslation>,
};

export type CountryList = PaginatedList & {
   __typename?: 'CountryList',
  items: Array<Country>,
  totalItems: Scalars['Int'],
};

export type CountryTranslation = {
   __typename?: 'CountryTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
};

export type CreateAddressInput = {
  fullName?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  streetLine1: Scalars['String'],
  streetLine2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  province?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  countryCode: Scalars['String'],
  phoneNumber?: Maybe<Scalars['String']>,
  defaultShippingAddress?: Maybe<Scalars['Boolean']>,
  defaultBillingAddress?: Maybe<Scalars['Boolean']>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  phoneNumber?: Maybe<Scalars['String']>,
  emailAddress: Scalars['String'],
  customFields?: Maybe<Scalars['JSON']>,
};

/** 
 * @description
 * ISO 4217 currency code
 * 
 * @docsCategory common
 **/
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL'
}

export type CurrentUser = {
   __typename?: 'CurrentUser',
  id: Scalars['ID'],
  identifier: Scalars['String'],
  channels: Array<CurrentUserChannel>,
};

export type CurrentUserChannel = {
   __typename?: 'CurrentUserChannel',
  id: Scalars['ID'],
  token: Scalars['String'],
  code: Scalars['String'],
  permissions: Array<Permission>,
};

export type Customer = Node & {
   __typename?: 'Customer',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  title?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  phoneNumber?: Maybe<Scalars['String']>,
  emailAddress: Scalars['String'],
  addresses?: Maybe<Array<Address>>,
  orders: OrderList,
  user?: Maybe<User>,
  customFields?: Maybe<Scalars['JSON']>,
};


export type CustomerOrdersArgs = {
  options?: Maybe<OrderListOptions>
};

export type CustomerFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  title?: Maybe<StringOperators>,
  firstName?: Maybe<StringOperators>,
  lastName?: Maybe<StringOperators>,
  phoneNumber?: Maybe<StringOperators>,
  emailAddress?: Maybe<StringOperators>,
};

export type CustomerGroup = Node & {
   __typename?: 'CustomerGroup',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  customers: CustomerList,
};


export type CustomerGroupCustomersArgs = {
  options?: Maybe<CustomerListOptions>
};

export type CustomerList = PaginatedList & {
   __typename?: 'CustomerList',
  items: Array<Customer>,
  totalItems: Scalars['Int'],
};

export type CustomerListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<CustomerSortParameter>,
  filter?: Maybe<CustomerFilterParameter>,
};

export type CustomerSortParameter = {
  id?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  title?: Maybe<SortOrder>,
  firstName?: Maybe<SortOrder>,
  lastName?: Maybe<SortOrder>,
  phoneNumber?: Maybe<SortOrder>,
  emailAddress?: Maybe<SortOrder>,
};

export type CustomField = {
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
};

export type CustomFieldConfig = StringCustomFieldConfig | LocaleStringCustomFieldConfig | IntCustomFieldConfig | FloatCustomFieldConfig | BooleanCustomFieldConfig | DateTimeCustomFieldConfig;

export type CustomFields = {
   __typename?: 'CustomFields',
  Address: Array<CustomFieldConfig>,
  Collection: Array<CustomFieldConfig>,
  Customer: Array<CustomFieldConfig>,
  Facet: Array<CustomFieldConfig>,
  FacetValue: Array<CustomFieldConfig>,
  GlobalSettings: Array<CustomFieldConfig>,
  Order: Array<CustomFieldConfig>,
  OrderLine: Array<CustomFieldConfig>,
  Product: Array<CustomFieldConfig>,
  ProductOption: Array<CustomFieldConfig>,
  ProductOptionGroup: Array<CustomFieldConfig>,
  ProductVariant: Array<CustomFieldConfig>,
  User: Array<CustomFieldConfig>,
  ShippingMethod: Array<CustomFieldConfig>,
};

export type DateOperators = {
  eq?: Maybe<Scalars['DateTime']>,
  before?: Maybe<Scalars['DateTime']>,
  after?: Maybe<Scalars['DateTime']>,
  between?: Maybe<DateRange>,
};

export type DateRange = {
  start: Scalars['DateTime'],
  end: Scalars['DateTime'],
};


/** 
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 **/
export type DateTimeCustomFieldConfig = CustomField & {
   __typename?: 'DateTimeCustomFieldConfig',
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
  min?: Maybe<Scalars['String']>,
  max?: Maybe<Scalars['String']>,
  step?: Maybe<Scalars['Int']>,
};

export type DeletionResponse = {
   __typename?: 'DeletionResponse',
  result: DeletionResult,
  message?: Maybe<Scalars['String']>,
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED'
}

export type Facet = Node & {
   __typename?: 'Facet',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
  code: Scalars['String'],
  values: Array<FacetValue>,
  translations: Array<FacetTranslation>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type FacetList = PaginatedList & {
   __typename?: 'FacetList',
  items: Array<Facet>,
  totalItems: Scalars['Int'],
};

export type FacetResult = {
   __typename?: 'FacetResult',
  id: Scalars['ID'],
  name: Scalars['String'],
  code: Scalars['String'],
  isPrivate: Scalars['Boolean'],
  facetValues: Array<FacetValueResult>,
};

export type FacetTranslation = {
   __typename?: 'FacetTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
};

export type FacetValue = Node & {
   __typename?: 'FacetValue',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  facet: Facet,
  name: Scalars['String'],
  code: Scalars['String'],
  translations: Array<FacetValueTranslation>,
  customFields?: Maybe<Scalars['JSON']>,
};

/** 
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 **/
export type FacetValueResult = {
   __typename?: 'FacetValueResult',
  facetValue: FacetValue,
  count: Scalars['Int'],
};

export type FacetValueTranslation = {
   __typename?: 'FacetValueTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
};

export type FloatCustomFieldConfig = CustomField & {
   __typename?: 'FloatCustomFieldConfig',
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
  min?: Maybe<Scalars['Float']>,
  max?: Maybe<Scalars['Float']>,
  step?: Maybe<Scalars['Float']>,
};

export type Fulfillment = Node & {
   __typename?: 'Fulfillment',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  orderItems: Array<OrderItem>,
  method: Scalars['String'],
  trackingCode?: Maybe<Scalars['String']>,
};

export type GlobalSettings = {
   __typename?: 'GlobalSettings',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  availableLanguages: Array<LanguageCode>,
  trackInventory: Scalars['Boolean'],
  serverConfig: ServerConfig,
  customFields?: Maybe<GlobalSettingsCustomFields>,
};

export type GlobalSettingsCustomFields = {
   __typename?: 'GlobalSettingsCustomFields',
  receivedEmailAddress?: Maybe<Scalars['String']>,
  enableCaptcha?: Maybe<Scalars['Boolean']>,
  recaptchaSiteKey?: Maybe<Scalars['String']>,
  recaptchaSecretKey?: Maybe<Scalars['String']>,
  enablePhone?: Maybe<Scalars['Boolean']>,
  enableNewsletterFirstName?: Maybe<Scalars['Boolean']>,
  enableNewsletterLastName?: Maybe<Scalars['Boolean']>,
  enableNewsletterPhone?: Maybe<Scalars['Boolean']>,
  enableNewsletterCaptcha?: Maybe<Scalars['Boolean']>,
};

export type HistoryEntry = Node & {
   __typename?: 'HistoryEntry',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  isPublic: Scalars['Boolean'],
  type: HistoryEntryType,
  administrator?: Maybe<Administrator>,
  data: Scalars['JSON'],
};

export type HistoryEntryFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  isPublic?: Maybe<BooleanOperators>,
  type?: Maybe<StringOperators>,
};

export type HistoryEntryList = PaginatedList & {
   __typename?: 'HistoryEntryList',
  items: Array<HistoryEntry>,
  totalItems: Scalars['Int'],
};

export type HistoryEntryListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<HistoryEntrySortParameter>,
  filter?: Maybe<HistoryEntryFilterParameter>,
};

export type HistoryEntrySortParameter = {
  id?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
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
   __typename?: 'ImportInfo',
  errors?: Maybe<Array<Scalars['String']>>,
  processed: Scalars['Int'],
  imported: Scalars['Int'],
};

export type IntCustomFieldConfig = CustomField & {
   __typename?: 'IntCustomFieldConfig',
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
  min?: Maybe<Scalars['Int']>,
  max?: Maybe<Scalars['Int']>,
  step?: Maybe<Scalars['Int']>,
};


/** 
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 * 
 * @docsCategory common
 **/
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Albanian */
  Sq = 'sq',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Armenian */
  Hy = 'hy',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Basque */
  Eu = 'eu',
  /** Belarusian */
  Be = 'be',
  /** Bosnian */
  Bs = 'bs',
  /** Breton */
  Br = 'br',
  /** Bulgarian */
  Bg = 'bg',
  /** Burmese */
  My = 'my',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Church Slavic */
  Cu = 'cu',
  /** Cornish */
  Kw = 'kw',
  /** Corsican */
  Co = 'co',
  /** Croatian */
  Hr = 'hr',
  /** Czech */
  Cs = 'cs',
  /** Danish */
  Da = 'da',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Dzongkha */
  Dz = 'dz',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Estonian */
  Et = 'et',
  /** Ewe */
  Ee = 'ee',
  /** Faroese */
  Fo = 'fo',
  /** Finnish */
  Fi = 'fi',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Fulah */
  Ff = 'ff',
  /** Galician */
  Gl = 'gl',
  /** Ganda */
  Lg = 'lg',
  /** Georgian */
  Ka = 'ka',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Greek */
  El = 'el',
  /** Gujarati */
  Gu = 'gu',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Hungarian */
  Hu = 'hu',
  /** Icelandic */
  Is = 'is',
  /** Igbo */
  Ig = 'ig',
  /** Indonesian */
  Id = 'id',
  /** Interlingua */
  Ia = 'ia',
  /** Irish */
  Ga = 'ga',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Kalaallisut */
  Kl = 'kl',
  /** Kannada */
  Kn = 'kn',
  /** Kashmiri */
  Ks = 'ks',
  /** Kazakh */
  Kk = 'kk',
  /** Khmer */
  Km = 'km',
  /** Kikuyu */
  Ki = 'ki',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Korean */
  Ko = 'ko',
  /** Kurdish */
  Ku = 'ku',
  /** Kyrgyz */
  Ky = 'ky',
  /** Lao */
  Lo = 'lo',
  /** Latin */
  La = 'la',
  /** Latvian */
  Lv = 'lv',
  /** Lingala */
  Ln = 'ln',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Luxembourgish */
  Lb = 'lb',
  /** Macedonian */
  Mk = 'mk',
  /** Malagasy */
  Mg = 'mg',
  /** Malay */
  Ms = 'ms',
  /** Malayalam */
  Ml = 'ml',
  /** Maltese */
  Mt = 'mt',
  /** Manx */
  Gv = 'gv',
  /** Maori */
  Mi = 'mi',
  /** Marathi */
  Mr = 'mr',
  /** Mongolian */
  Mn = 'mn',
  /** Nepali */
  Ne = 'ne',
  /** North Ndebele */
  Nd = 'nd',
  /** Northern Sami */
  Se = 'se',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Odia */
  Or = 'or',
  /** Oromo */
  Om = 'om',
  /** Ossetic */
  Os = 'os',
  /** Pashto */
  Ps = 'ps',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Polish */
  Pl = 'pl',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Punjabi */
  Pa = 'pa',
  /** Quechua */
  Qu = 'qu',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Russian */
  Ru = 'ru',
  /** Samoan */
  Sm = 'sm',
  /** Sango */
  Sg = 'sg',
  /** Sanskrit */
  Sa = 'sa',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Serbian */
  Sr = 'sr',
  /** Shona */
  Sn = 'sn',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Sindhi */
  Sd = 'sd',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Somali */
  So = 'so',
  /** Southern Sotho */
  St = 'st',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Sundanese */
  Su = 'su',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Swedish */
  Sv = 'sv',
  /** Tajik */
  Tg = 'tg',
  /** Tamil */
  Ta = 'ta',
  /** Tatar */
  Tt = 'tt',
  /** Telugu */
  Te = 'te',
  /** Thai */
  Th = 'th',
  /** Tibetan */
  Bo = 'bo',
  /** Tigrinya */
  Ti = 'ti',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Turkmen */
  Tk = 'tk',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uyghur */
  Ug = 'ug',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Welsh */
  Cy = 'cy',
  /** Western Frisian */
  Fy = 'fy',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Zulu */
  Zu = 'zu'
}

export type LocaleStringCustomFieldConfig = CustomField & {
   __typename?: 'LocaleStringCustomFieldConfig',
  name: Scalars['String'],
  type: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
  pattern?: Maybe<Scalars['String']>,
};

export type LocalizedString = {
   __typename?: 'LocalizedString',
  languageCode: LanguageCode,
  value: Scalars['String'],
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LoginResult = {
   __typename?: 'LoginResult',
  user: CurrentUser,
};

export type Mutation = {
   __typename?: 'Mutation',
  /** 
 * Adds an item to the order. If custom fields are defined on the OrderLine
   * entity, a third argument 'customFields' will be available.
 **/
  addItemToOrder?: Maybe<Order>,
  /** Remove an OrderLine from the Order */
  removeOrderLine?: Maybe<Order>,
  /** 
 * Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a
   * third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available.
 **/
  adjustOrderLine?: Maybe<Order>,
  /** Applies the given coupon code to the active Order */
  applyCouponCode?: Maybe<Order>,
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>,
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<Order>,
  /** Sets the shipping address for this order */
  setOrderShippingAddress?: Maybe<Order>,
  /** Sets the billing address for this order */
  setOrderBillingAddress?: Maybe<Order>,
  /** Allows any custom fields to be set for the active order */
  setOrderCustomFields?: Maybe<Order>,
  /** Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query */
  setOrderShippingMethod?: Maybe<Order>,
  /** Add a Payment to the Order */
  addPaymentToOrder?: Maybe<Order>,
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder?: Maybe<Order>,
  /** 
 * Authenticates the user using the native authentication strategy. This mutation
   * is an alias for `authenticate({ native: { ... }})`
 **/
  login: LoginResult,
  /** Authenticates the user using a named authentication strategy */
  authenticate: LoginResult,
  /** End the current authenticated session */
  logout: Scalars['Boolean'],
  /** 
 * Regenerate and send a verification token for a new Customer registration. Only
   * applicable if `authOptions.requireVerification` is set to true.
 **/
  refreshCustomerVerification: Scalars['Boolean'],
  /** 
 * Register a Customer account with the given credentials. There are three possible registration flows:
   * 
   * _If `authOptions.requireVerification` is set to `true`:_
   * 
   * 1. **The Customer is registered _with_ a password**. A verificationToken will
   * be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount`
   * mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken
   * will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount`
   * mutation _with_ the chosed password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   * 
   * _If `authOptions.requireVerification` is set to `false`:_
   * 
   * 3. The Customer _must_ be registered _with_ a password. No further action is
   * needed - the Customer is able to authenticate immediately.
 **/
  registerCustomerAccount: Scalars['Boolean'],
  /** Update an existing Customer */
  updateCustomer: Customer,
  /** Create a new Customer Address */
  createCustomerAddress: Address,
  /** Update an existing Address */
  updateCustomerAddress: Address,
  /** Delete an existing Address */
  deleteCustomerAddress: Scalars['Boolean'],
  /** 
 * Verify a Customer email address with the token sent to that address. Only
   * applicable if `authOptions.requireVerification` is set to true.
   * 
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the a password _must_ be
   * provided here.
 **/
  verifyCustomerAccount: LoginResult,
  /** Update the password of the active Customer */
  updateCustomerPassword?: Maybe<Scalars['Boolean']>,
  /** 
 * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
 **/
  requestUpdateCustomerEmailAddress?: Maybe<Scalars['Boolean']>,
  /** 
 * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
 **/
  updateCustomerEmailAddress?: Maybe<Scalars['Boolean']>,
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<Scalars['Boolean']>,
  /** Resets a Customer's password based on the provided token */
  resetPassword: LoginResult,
  submitProductReview: ProductReview,
  voteOnReview: ProductReview,
  submitContact: Contact,
  submitContactShop: Contact,
  submitSubscriber: Subscriber,
  submitUnSubscriber: Subscriber,
  createVendor?: Maybe<Vendor>,
  createVendorInfo?: Maybe<VendorInfo>,
  createVendorBank?: Maybe<VendorBank>,
  createVendorContact?: Maybe<VendorContact>,
  createVendorMarketingContact?: Maybe<VendorMarketingContact>,
  verifyVendorAccount: VerifyResponse,
  addItemToOrderVendor?: Maybe<Array<Maybe<Order>>>,
  removeOrderVendorLine?: Maybe<Array<Maybe<Order>>>,
  adjustOrderVendorLine?: Maybe<Array<Maybe<Order>>>,
  transitionOrderVendorToState?: Maybe<Array<Maybe<Order>>>,
  setCustomerForOrderVendors?: Maybe<Array<Maybe<Order>>>,
  setOrderVendorShippingAddress?: Maybe<Array<Maybe<Order>>>,
  setOrderVendorBillingAddress?: Maybe<Array<Maybe<Order>>>,
  applyCouponCodeForOrderVendor?: Maybe<Array<Maybe<Order>>>,
  removeCouponCodeForOrderVendor?: Maybe<Array<Maybe<Order>>>,
  setShippingMethodByOrderVendor?: Maybe<Array<Maybe<Order>>>,
  addPaymentToOrderVendors?: Maybe<Array<Maybe<Order>>>,
};


export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID'],
  quantity: Scalars['Int']
};


export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID']
};


export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID'],
  quantity?: Maybe<Scalars['Int']>
};


export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String']
};


export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String']
};


export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String']
};


export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput
};


export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput
};


export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Scalars['ID']
};


export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput
};


export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput
};


export type MutationLoginArgs = {
  username: Scalars['String'],
  password: Scalars['String'],
  rememberMe?: Maybe<Scalars['Boolean']>
};


export type MutationAuthenticateArgs = {
  input: AuthenticationInput,
  rememberMe?: Maybe<Scalars['Boolean']>
};


export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String']
};


export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID']
};


export type MutationVerifyCustomerAccountArgs = {
  token: Scalars['String'],
  password?: Maybe<Scalars['String']>
};


export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationRequestUpdateCustomerEmailAddressArgs = {
  password: Scalars['String'],
  newEmailAddress: Scalars['String']
};


export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String']
};


export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String']
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'],
  password: Scalars['String']
};


export type MutationSubmitProductReviewArgs = {
  input: SubmitProductReviewInput
};


export type MutationVoteOnReviewArgs = {
  id: Scalars['ID'],
  vote: Scalars['Boolean']
};


export type MutationSubmitContactArgs = {
  input: SubmitContactInput
};


export type MutationSubmitContactShopArgs = {
  input: SubmitContactShopInput
};


export type MutationSubmitSubscriberArgs = {
  input: SubmitSubscriberInput
};


export type MutationSubmitUnSubscriberArgs = {
  input: SubmitUnSubscriberInput
};


export type MutationCreateVendorArgs = {
  input: VendorInput
};


export type MutationCreateVendorInfoArgs = {
  input: VendorInfoInput
};


export type MutationCreateVendorBankArgs = {
  input: VendorBankInput
};


export type MutationCreateVendorContactArgs = {
  input: VendorContactInput
};


export type MutationCreateVendorMarketingContactArgs = {
  input: VendorMarketingContactInput
};


export type MutationVerifyVendorAccountArgs = {
  token: Scalars['String'],
  password?: Maybe<Scalars['String']>
};


export type MutationAddItemToOrderVendorArgs = {
  productVariantId: Scalars['ID'],
  quantity: Scalars['Int'],
  channelId: Scalars['ID']
};


export type MutationRemoveOrderVendorLineArgs = {
  orderLineId: Scalars['ID']
};


export type MutationAdjustOrderVendorLineArgs = {
  orderLineId: Scalars['ID'],
  quantity?: Maybe<Scalars['Int']>
};


export type MutationTransitionOrderVendorToStateArgs = {
  state: Scalars['String']
};


export type MutationSetCustomerForOrderVendorsArgs = {
  input: CreateCustomerInput
};


export type MutationSetOrderVendorShippingAddressArgs = {
  input: CreateAddressInput
};


export type MutationSetOrderVendorBillingAddressArgs = {
  input: CreateAddressInput
};


export type MutationApplyCouponCodeForOrderVendorArgs = {
  orderId: Scalars['ID'],
  couponCode: Scalars['String']
};


export type MutationRemoveCouponCodeForOrderVendorArgs = {
  orderId: Scalars['ID'],
  couponCode: Scalars['String']
};


export type MutationSetShippingMethodByOrderVendorArgs = {
  shippingMethodId: Scalars['ID'],
  oderId: Scalars['ID']
};


export type MutationAddPaymentToOrderVendorsArgs = {
  input: OrderVendorPaymentInput
};

export type NativeAuthInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Newsletter = Node & {
   __typename?: 'Newsletter',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  subject?: Maybe<Scalars['String']>,
  customerGroupId?: Maybe<Scalars['Int']>,
  priority?: Maybe<Scalars['Int']>,
  template_name?: Maybe<Scalars['String']>,
  templateContent?: Maybe<Scalars['String']>,
  templateCss?: Maybe<Scalars['String']>,
  params?: Maybe<Scalars['String']>,
  status: Scalars['Int'],
  type: Scalars['String'],
};

export type NewsletterDeleteReturn = {
   __typename?: 'NewsletterDeleteReturn',
  error?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
};

export type NewsletterList = PaginatedList & {
   __typename?: 'NewsletterList',
  items: Array<Newsletter>,
  totalItems: Scalars['Int'],
};

export type NewsletterListOptions = {
  skip: Scalars['Int'],
  take: Scalars['Int'],
};

export type NewsletterQueue = Node & {
   __typename?: 'NewsletterQueue',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  templateId?: Maybe<Scalars['ID']>,
  newsletter_subject?: Maybe<Scalars['String']>,
  newsletter_template_name?: Maybe<Scalars['String']>,
  newsletter_text?: Maybe<Scalars['String']>,
  newsletter_styles?: Maybe<Scalars['String']>,
  newsletter_params?: Maybe<Scalars['String']>,
  queue_status: Scalars['Int'],
  queue_start_at?: Maybe<Scalars['DateTime']>,
  queue_finish_at?: Maybe<Scalars['DateTime']>,
};

export type NewsletterQueueLink = Node & {
   __typename?: 'NewsletterQueueLink',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  subscriber?: Maybe<Subscriber>,
  queue?: Maybe<NewsletterQueue>,
  letter_sent_at?: Maybe<Scalars['DateTime']>,
};

export type NewsletterQueueList = PaginatedList & {
   __typename?: 'NewsletterQueueList',
  items: Array<NewsletterQueue>,
  totalItems: Scalars['Int'],
};

export type NewsletterQueueListOptions = {
  skip: Scalars['Int'],
  take: Scalars['Int'],
};

export type Node = {
  id: Scalars['ID'],
};

export type NumberOperators = {
  eq?: Maybe<Scalars['Float']>,
  lt?: Maybe<Scalars['Float']>,
  lte?: Maybe<Scalars['Float']>,
  gt?: Maybe<Scalars['Float']>,
  gte?: Maybe<Scalars['Float']>,
  between?: Maybe<NumberRange>,
};

export type NumberRange = {
  start: Scalars['Float'],
  end: Scalars['Float'],
};

export type Order = Node & {
   __typename?: 'Order',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  /** A unique code for the Order */
  code: Scalars['String'],
  state: Scalars['String'],
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean'],
  customer?: Maybe<Customer>,
  shippingAddress?: Maybe<OrderAddress>,
  billingAddress?: Maybe<OrderAddress>,
  lines: Array<OrderLine>,
  /** Order-level adjustments to the order total, such as discounts from promotions */
  adjustments: Array<Adjustment>,
  couponCodes: Array<Scalars['String']>,
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>,
  payments?: Maybe<Array<Payment>>,
  fulfillments?: Maybe<Array<Fulfillment>>,
  subTotalBeforeTax: Scalars['Int'],
  /** The subTotal is the total of the OrderLines, before order-level promotions and shipping has been applied. */
  subTotal: Scalars['Int'],
  currencyCode: CurrencyCode,
  shipping: Scalars['Int'],
  shippingWithTax: Scalars['Int'],
  shippingMethod?: Maybe<ShippingMethod>,
  totalBeforeTax: Scalars['Int'],
  total: Scalars['Int'],
  history: HistoryEntryList,
  channel?: Maybe<Channel>,
  customFields?: Maybe<OrderCustomFields>,
};


export type OrderHistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>
};

export type OrderAddress = {
   __typename?: 'OrderAddress',
  fullName?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  streetLine1?: Maybe<Scalars['String']>,
  streetLine2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  province?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  countryCode?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
};

export type OrderCustomFields = {
   __typename?: 'OrderCustomFields',
  stateGroup?: Maybe<Scalars['String']>,
  dispatchedDate?: Maybe<Scalars['DateTime']>,
  daysOfSla?: Maybe<Scalars['String']>,
};

export type OrderFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  code?: Maybe<StringOperators>,
  state?: Maybe<StringOperators>,
  active?: Maybe<BooleanOperators>,
  subTotalBeforeTax?: Maybe<NumberOperators>,
  subTotal?: Maybe<NumberOperators>,
  currencyCode?: Maybe<StringOperators>,
  shipping?: Maybe<NumberOperators>,
  shippingWithTax?: Maybe<NumberOperators>,
  totalBeforeTax?: Maybe<NumberOperators>,
  total?: Maybe<NumberOperators>,
  stateGroup?: Maybe<StringOperators>,
  dispatchedDate?: Maybe<DateOperators>,
  daysOfSla?: Maybe<StringOperators>,
};

export type OrderItem = Node & {
   __typename?: 'OrderItem',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  cancelled: Scalars['Boolean'],
  unitPrice: Scalars['Int'],
  unitPriceWithTax: Scalars['Int'],
  unitPriceIncludesTax: Scalars['Boolean'],
  taxRate: Scalars['Float'],
  adjustments: Array<Adjustment>,
  fulfillment?: Maybe<Fulfillment>,
  refundId?: Maybe<Scalars['ID']>,
};

export type OrderLine = Node & {
   __typename?: 'OrderLine',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  productVariant: ProductVariant,
  featuredAsset?: Maybe<Asset>,
  unitPrice: Scalars['Int'],
  unitPriceWithTax: Scalars['Int'],
  quantity: Scalars['Int'],
  items: Array<OrderItem>,
  totalPrice: Scalars['Int'],
  adjustments: Array<Adjustment>,
  order: Order,
  customFields?: Maybe<Scalars['JSON']>,
};

export type OrderList = PaginatedList & {
   __typename?: 'OrderList',
  items: Array<Order>,
  totalItems: Scalars['Int'],
};

export type OrderListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<OrderSortParameter>,
  filter?: Maybe<OrderFilterParameter>,
};

export type OrderProcessState = {
   __typename?: 'OrderProcessState',
  name: Scalars['String'],
  to: Array<Scalars['String']>,
};

export type OrderSortParameter = {
  id?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  code?: Maybe<SortOrder>,
  state?: Maybe<SortOrder>,
  subTotalBeforeTax?: Maybe<SortOrder>,
  subTotal?: Maybe<SortOrder>,
  shipping?: Maybe<SortOrder>,
  shippingWithTax?: Maybe<SortOrder>,
  totalBeforeTax?: Maybe<SortOrder>,
  total?: Maybe<SortOrder>,
  stateGroup?: Maybe<SortOrder>,
  dispatchedDate?: Maybe<SortOrder>,
  daysOfSla?: Maybe<SortOrder>,
};

export type OrderVendorPaymentInput = {
  method: Scalars['String'],
  metadata: Scalars['JSON'],
};

export type PaginatedList = {
  items: Array<Node>,
  totalItems: Scalars['Int'],
};

export type Payment = Node & {
   __typename?: 'Payment',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  method: Scalars['String'],
  amount: Scalars['Int'],
  state: Scalars['String'],
  transactionId?: Maybe<Scalars['String']>,
  errorMessage?: Maybe<Scalars['String']>,
  refunds: Array<Refund>,
  metadata?: Maybe<Scalars['JSON']>,
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /** This field should correspond to the `code` property of a PaymentMethodHandler. */
  method: Scalars['String'],
  /** 
 * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
 **/
  metadata: Scalars['JSON'],
};

export type PaymentMethod = Node & {
   __typename?: 'PaymentMethod',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  code: Scalars['String'],
  enabled: Scalars['Boolean'],
  configArgs: Array<ConfigArg>,
};

/** 
 * "
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 * 
 * @docsCategory common
 **/
export enum Permission {
  /**  The Authenticated role means simply that the user is logged in  */
  Authenticated = 'Authenticated',
  /**  SuperAdmin can perform the most sensitive tasks */
  SuperAdmin = 'SuperAdmin',
  /**  Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /**  Public means any unauthenticated user may perform the operation  */
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

/** The price range where the result has more than one price */
export type PriceRange = {
   __typename?: 'PriceRange',
  min: Scalars['Int'],
  max: Scalars['Int'],
};

export type Product = Node & {
   __typename?: 'Product',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
  slug: Scalars['String'],
  description: Scalars['String'],
  featuredAsset?: Maybe<Asset>,
  assets: Array<Asset>,
  variants: Array<ProductVariant>,
  optionGroups: Array<ProductOptionGroup>,
  facetValues: Array<FacetValue>,
  translations: Array<ProductTranslation>,
  collections: Array<Collection>,
  reviews: ProductReviewList,
  reviewsHistogram: Array<ProductReviewHistogramItem>,
  channel?: Maybe<Channel>,
  customFields?: Maybe<ProductCustomFields>,
};


export type ProductReviewsArgs = {
  options?: Maybe<ProductReviewListOptions>
};

export type ProductCustomFields = {
   __typename?: 'ProductCustomFields',
  reviewRating?: Maybe<Scalars['Float']>,
  reviewCount?: Maybe<Scalars['Float']>,
  productRecommendationsEnabled?: Maybe<Scalars['Boolean']>,
  isInStock?: Maybe<Scalars['Boolean']>,
  weight?: Maybe<Scalars['Float']>,
  length?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  width?: Maybe<Scalars['Float']>,
  massUnit?: Maybe<Scalars['String']>,
  distanceUnit?: Maybe<Scalars['String']>,
};

export type ProductFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  languageCode?: Maybe<StringOperators>,
  name?: Maybe<StringOperators>,
  slug?: Maybe<StringOperators>,
  description?: Maybe<StringOperators>,
  reviewRating?: Maybe<NumberOperators>,
  reviewCount?: Maybe<NumberOperators>,
  productRecommendationsEnabled?: Maybe<BooleanOperators>,
  isInStock?: Maybe<BooleanOperators>,
  weight?: Maybe<NumberOperators>,
  length?: Maybe<NumberOperators>,
  height?: Maybe<NumberOperators>,
  width?: Maybe<NumberOperators>,
  massUnit?: Maybe<StringOperators>,
  distanceUnit?: Maybe<StringOperators>,
};

export type ProductList = PaginatedList & {
   __typename?: 'ProductList',
  items: Array<Product>,
  totalItems: Scalars['Int'],
};

export type ProductListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<ProductSortParameter>,
  filter?: Maybe<ProductFilterParameter>,
};

export type ProductOption = Node & {
   __typename?: 'ProductOption',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  code: Scalars['String'],
  name: Scalars['String'],
  groupId: Scalars['ID'],
  group: ProductOptionGroup,
  translations: Array<ProductOptionTranslation>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type ProductOptionGroup = Node & {
   __typename?: 'ProductOptionGroup',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  code: Scalars['String'],
  name: Scalars['String'],
  options: Array<ProductOption>,
  translations: Array<ProductOptionGroupTranslation>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type ProductOptionGroupTranslation = {
   __typename?: 'ProductOptionGroupTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
};

export type ProductOptionTranslation = {
   __typename?: 'ProductOptionTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
};

export type ProductRecommendation = {
   __typename?: 'ProductRecommendation',
  product: Product,
  recommendation: Product,
  type: RecommendationType,
};

export type ProductReview = Node & {
   __typename?: 'ProductReview',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  product: Product,
  productVariant?: Maybe<ProductVariant>,
  summary: Scalars['String'],
  body?: Maybe<Scalars['String']>,
  rating: Scalars['Float'],
  author?: Maybe<Customer>,
  authorName: Scalars['String'],
  authorLocation?: Maybe<Scalars['String']>,
  upvotes: Scalars['Int'],
  downvotes: Scalars['Int'],
  state: Scalars['String'],
  response?: Maybe<Scalars['String']>,
  responseCreatedAt?: Maybe<Scalars['DateTime']>,
};

export type ProductReviewFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  summary?: Maybe<StringOperators>,
  body?: Maybe<StringOperators>,
  rating?: Maybe<NumberOperators>,
  authorName?: Maybe<StringOperators>,
  authorLocation?: Maybe<StringOperators>,
  upvotes?: Maybe<NumberOperators>,
  downvotes?: Maybe<NumberOperators>,
  state?: Maybe<StringOperators>,
  response?: Maybe<StringOperators>,
  responseCreatedAt?: Maybe<DateOperators>,
};

export type ProductReviewHistogramItem = {
   __typename?: 'ProductReviewHistogramItem',
  bin: Scalars['Int'],
  frequency: Scalars['Int'],
};

export type ProductReviewList = PaginatedList & {
   __typename?: 'ProductReviewList',
  items: Array<ProductReview>,
  totalItems: Scalars['Int'],
};

export type ProductReviewListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<ProductReviewSortParameter>,
  filter?: Maybe<ProductReviewFilterParameter>,
};

export type ProductReviewSortParameter = {
  id?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  summary?: Maybe<SortOrder>,
  body?: Maybe<SortOrder>,
  rating?: Maybe<SortOrder>,
  authorName?: Maybe<SortOrder>,
  authorLocation?: Maybe<SortOrder>,
  upvotes?: Maybe<SortOrder>,
  downvotes?: Maybe<SortOrder>,
  state?: Maybe<SortOrder>,
  response?: Maybe<SortOrder>,
  responseCreatedAt?: Maybe<SortOrder>,
};

export type ProductSortParameter = {
  id?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  name?: Maybe<SortOrder>,
  slug?: Maybe<SortOrder>,
  description?: Maybe<SortOrder>,
  reviewRating?: Maybe<SortOrder>,
  reviewCount?: Maybe<SortOrder>,
  productRecommendationsEnabled?: Maybe<SortOrder>,
  isInStock?: Maybe<SortOrder>,
  weight?: Maybe<SortOrder>,
  length?: Maybe<SortOrder>,
  height?: Maybe<SortOrder>,
  width?: Maybe<SortOrder>,
  massUnit?: Maybe<SortOrder>,
  distanceUnit?: Maybe<SortOrder>,
};

export type ProductTranslation = {
   __typename?: 'ProductTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
  slug: Scalars['String'],
  description: Scalars['String'],
};

export type ProductVariant = Node & {
   __typename?: 'ProductVariant',
  id: Scalars['ID'],
  product: Product,
  productId: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  sku: Scalars['String'],
  name: Scalars['String'],
  featuredAsset?: Maybe<Asset>,
  assets: Array<Asset>,
  price: Scalars['Int'],
  currencyCode: CurrencyCode,
  priceIncludesTax: Scalars['Boolean'],
  priceWithTax: Scalars['Int'],
  taxRateApplied: TaxRate,
  taxCategory: TaxCategory,
  options: Array<ProductOption>,
  facetValues: Array<FacetValue>,
  translations: Array<ProductVariantTranslation>,
  customFields?: Maybe<ProductVariantCustomFields>,
};

export type ProductVariantCustomFields = {
   __typename?: 'ProductVariantCustomFields',
  tierPriceEnabled?: Maybe<Scalars['Boolean']>,
  shippingPrice?: Maybe<Scalars['Float']>,
  shippingBusinessPrice?: Maybe<Scalars['Float']>,
};

export type ProductVariantFilterParameter = {
  createdAt?: Maybe<DateOperators>,
  updatedAt?: Maybe<DateOperators>,
  languageCode?: Maybe<StringOperators>,
  sku?: Maybe<StringOperators>,
  name?: Maybe<StringOperators>,
  price?: Maybe<NumberOperators>,
  currencyCode?: Maybe<StringOperators>,
  priceIncludesTax?: Maybe<BooleanOperators>,
  priceWithTax?: Maybe<NumberOperators>,
  tierPriceEnabled?: Maybe<BooleanOperators>,
  shippingPrice?: Maybe<NumberOperators>,
  shippingBusinessPrice?: Maybe<NumberOperators>,
};

export type ProductVariantList = PaginatedList & {
   __typename?: 'ProductVariantList',
  items: Array<ProductVariant>,
  totalItems: Scalars['Int'],
};

export type ProductVariantListOptions = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  sort?: Maybe<ProductVariantSortParameter>,
  filter?: Maybe<ProductVariantFilterParameter>,
};

export type ProductVariantSortParameter = {
  id?: Maybe<SortOrder>,
  productId?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sku?: Maybe<SortOrder>,
  name?: Maybe<SortOrder>,
  price?: Maybe<SortOrder>,
  priceWithTax?: Maybe<SortOrder>,
  tierPriceEnabled?: Maybe<SortOrder>,
  shippingPrice?: Maybe<SortOrder>,
  shippingBusinessPrice?: Maybe<SortOrder>,
};

export type ProductVariantTranslation = {
   __typename?: 'ProductVariantTranslation',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  languageCode: LanguageCode,
  name: Scalars['String'],
};

export type Promotion = Node & {
   __typename?: 'Promotion',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  startsAt?: Maybe<Scalars['DateTime']>,
  endsAt?: Maybe<Scalars['DateTime']>,
  couponCode?: Maybe<Scalars['String']>,
  perCustomerUsageLimit?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  enabled: Scalars['Boolean'],
  conditions: Array<ConfigurableOperation>,
  actions: Array<ConfigurableOperation>,
};

export type PromotionList = PaginatedList & {
   __typename?: 'PromotionList',
  items: Array<Promotion>,
  totalItems: Scalars['Int'],
};

export type Query = {
   __typename?: 'Query',
  /** The active Channel */
  activeChannel: Channel,
  /** The active Customer */
  activeCustomer?: Maybe<Customer>,
  /** 
 * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentApproved` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
 **/
  activeOrder?: Maybe<Order>,
  /** An array of supported Countries */
  availableCountries: Array<Country>,
  /** A list of Collections available to the shop */
  collections: CollectionList,
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is speicified, an error will result. */
  collection?: Maybe<Collection>,
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>,
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>,
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']>,
  /** 
 * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
 **/
  order?: Maybe<Order>,
  /** 
 * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
 **/
  orderByCode?: Maybe<Order>,
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is speicified, an error will result. */
  product?: Maybe<Product>,
  /** Get a list of Products */
  products: ProductList,
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse,
  productRecommendations: Array<ProductRecommendation>,
  productTierPrices: Array<TierPrice>,
  generateBraintreeClientToken: Scalars['String'],
  generatePayumoneyClientToken: Array<Maybe<Scalars['String']>>,
  activeOrderVendors?: Maybe<Array<Maybe<Order>>>,
  getVendorByBrand?: Maybe<Vendor>,
  getVendorByEmail?: Maybe<Vendor>,
  eligibleVendorShippingMethods: Array<ShippingMethodQuote>,
};


export type QueryCollectionsArgs = {
  options?: Maybe<CollectionListOptions>
};


export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['String']>
};


export type QueryOrderArgs = {
  id: Scalars['ID']
};


export type QueryOrderByCodeArgs = {
  code: Scalars['String']
};


export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['String']>
};


export type QueryProductsArgs = {
  options?: Maybe<ProductListOptions>
};


export type QuerySearchArgs = {
  input: SearchInput
};


export type QueryProductRecommendationsArgs = {
  productId: Scalars['ID']
};


export type QueryProductTierPricesArgs = {
  productId: Scalars['ID']
};


export type QueryGenerateBraintreeClientTokenArgs = {
  orderId: Scalars['ID']
};


export type QueryGeneratePayumoneyClientTokenArgs = {
  orderId: Scalars['ID']
};


export type QueryGetVendorByBrandArgs = {
  brand: Scalars['String']
};


export type QueryGetVendorByEmailArgs = {
  email: Scalars['String']
};


export type QueryEligibleVendorShippingMethodsArgs = {
  id: Scalars['ID']
};

export enum RecommendationType {
  Crosssell = 'CROSSSELL',
  Upsell = 'UPSELL'
}

export type Refund = Node & {
   __typename?: 'Refund',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  items: Scalars['Int'],
  shipping: Scalars['Int'],
  adjustment: Scalars['Int'],
  total: Scalars['Int'],
  method?: Maybe<Scalars['String']>,
  state: Scalars['String'],
  transactionId?: Maybe<Scalars['String']>,
  reason?: Maybe<Scalars['String']>,
  orderItems: Array<OrderItem>,
  paymentId: Scalars['ID'],
  metadata?: Maybe<Scalars['JSON']>,
};

export type RegisterCustomerInput = {
  emailAddress: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type Return = Node & StockMovement & {
   __typename?: 'Return',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  productVariant: ProductVariant,
  type: StockMovementType,
  quantity: Scalars['Int'],
  orderItem: OrderItem,
};

export type Role = Node & {
   __typename?: 'Role',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  code: Scalars['String'],
  description: Scalars['String'],
  permissions: Array<Permission>,
  channels: Array<Channel>,
};

export type RoleList = PaginatedList & {
   __typename?: 'RoleList',
  items: Array<Role>,
  totalItems: Scalars['Int'],
};

export type Sale = Node & StockMovement & {
   __typename?: 'Sale',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  productVariant: ProductVariant,
  type: StockMovementType,
  quantity: Scalars['Int'],
  orderLine: OrderLine,
};

export type SearchInput = {
  term?: Maybe<Scalars['String']>,
  facetValueIds?: Maybe<Array<Scalars['ID']>>,
  facetValueOperator?: Maybe<LogicalOperator>,
  collectionId?: Maybe<Scalars['ID']>,
  groupByProduct?: Maybe<Scalars['Boolean']>,
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  sort?: Maybe<SearchResultSortParameter>,
  channelCode?: Maybe<Scalars['String']>,
};

export type SearchReindexResponse = {
   __typename?: 'SearchReindexResponse',
  success: Scalars['Boolean'],
};

export type SearchResponse = {
   __typename?: 'SearchResponse',
  items: Array<SearchResult>,
  totalItems: Scalars['Int'],
  facetValues: Array<FacetValueResult>,
  facets?: Maybe<Array<Maybe<FacetResult>>>,
};

export type SearchResult = {
   __typename?: 'SearchResult',
  sku: Scalars['String'],
  slug: Scalars['String'],
  productId: Scalars['ID'],
  productName: Scalars['String'],
  productPreview: Scalars['String'],
  productAsset?: Maybe<SearchResultAsset>,
  productVariantId: Scalars['ID'],
  productVariantName: Scalars['String'],
  productVariantPreview: Scalars['String'],
  productVariantAsset?: Maybe<SearchResultAsset>,
  price: SearchResultPrice,
  priceWithTax: SearchResultPrice,
  currencyCode: CurrencyCode,
  description: Scalars['String'],
  facetIds: Array<Scalars['ID']>,
  facetValueIds: Array<Scalars['ID']>,
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>,
  /** A relevence score for the result. Differs between database implementations */
  score: Scalars['Float'],
};

export type SearchResultAsset = {
   __typename?: 'SearchResultAsset',
  id: Scalars['ID'],
  preview: Scalars['String'],
  focalPoint?: Maybe<Coordinate>,
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: Maybe<SortOrder>,
  price?: Maybe<SortOrder>,
};

export type ServerConfig = {
   __typename?: 'ServerConfig',
  orderProcess: Array<OrderProcessState>,
  customFieldConfig: CustomFields,
};

export type ShippingMethod = Node & {
   __typename?: 'ShippingMethod',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  code: Scalars['String'],
  description: Scalars['String'],
  checker: ConfigurableOperation,
  calculator: ConfigurableOperation,
  customFields?: Maybe<Scalars['JSON']>,
};

export type ShippingMethodList = PaginatedList & {
   __typename?: 'ShippingMethodList',
  items: Array<ShippingMethod>,
  totalItems: Scalars['Int'],
};

export type ShippingMethodQuote = {
   __typename?: 'ShippingMethodQuote',
  id: Scalars['ID'],
  price: Scalars['Int'],
  priceWithTax: Scalars['Int'],
  description: Scalars['String'],
  metadata?: Maybe<Scalars['JSON']>,
};

/** The price value where the result has a single price */
export type SinglePrice = {
   __typename?: 'SinglePrice',
  value: Scalars['Int'],
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StockAdjustment = Node & StockMovement & {
   __typename?: 'StockAdjustment',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  productVariant: ProductVariant,
  type: StockMovementType,
  quantity: Scalars['Int'],
};

export type StockMovement = {
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  productVariant: ProductVariant,
  type: StockMovementType,
  quantity: Scalars['Int'],
};

export type StockMovementItem = StockAdjustment | Sale | Cancellation | Return;

export type StockMovementList = {
   __typename?: 'StockMovementList',
  items: Array<StockMovementItem>,
  totalItems: Scalars['Int'],
};

export enum StockMovementType {
  Adjustment = 'ADJUSTMENT',
  Sale = 'SALE',
  Cancellation = 'CANCELLATION',
  Return = 'RETURN'
}

export type StringCustomFieldConfig = CustomField & {
   __typename?: 'StringCustomFieldConfig',
  name: Scalars['String'],
  type: Scalars['String'],
  length?: Maybe<Scalars['Int']>,
  label?: Maybe<Array<LocalizedString>>,
  description?: Maybe<Array<LocalizedString>>,
  readonly?: Maybe<Scalars['Boolean']>,
  internal?: Maybe<Scalars['Boolean']>,
  pattern?: Maybe<Scalars['String']>,
  options?: Maybe<Array<StringFieldOption>>,
};

export type StringFieldOption = {
   __typename?: 'StringFieldOption',
  value: Scalars['String'],
  label?: Maybe<Array<LocalizedString>>,
};

export type StringOperators = {
  eq?: Maybe<Scalars['String']>,
  contains?: Maybe<Scalars['String']>,
};

export type SubmitContactInput = {
  channelId?: Maybe<Scalars['Int']>,
  customerId?: Maybe<Scalars['ID']>,
  subject: Scalars['String'],
  authorName: Scalars['String'],
  authorEmail: Scalars['String'],
  message: Scalars['String'],
  authorLocation?: Maybe<Scalars['String']>,
  authorPhone?: Maybe<Scalars['String']>,
  captcha?: Maybe<Scalars['String']>,
  authorIp?: Maybe<Scalars['String']>,
};

export type SubmitContactShopInput = {
  channelId?: Maybe<Scalars['Int']>,
  customerId?: Maybe<Scalars['ID']>,
  subject: Scalars['String'],
  authorName: Scalars['String'],
  authorEmail: Scalars['String'],
  message: Scalars['String'],
  authorLocation?: Maybe<Scalars['String']>,
  authorPhone?: Maybe<Scalars['String']>,
  captcha?: Maybe<Scalars['String']>,
  authorIp?: Maybe<Scalars['String']>,
};

export type SubmitProductReviewInput = {
  productId: Scalars['ID'],
  variantId?: Maybe<Scalars['ID']>,
  customerId?: Maybe<Scalars['ID']>,
  summary: Scalars['String'],
  body: Scalars['String'],
  rating: Scalars['Float'],
  authorName: Scalars['String'],
  authorLocation?: Maybe<Scalars['String']>,
};

export type SubmitSubscriberInput = {
  customerId?: Maybe<Scalars['ID']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  captcha?: Maybe<Scalars['String']>,
};

export type SubmitUnSubscriberInput = {
  token: Scalars['String'],
};

export type Subscriber = Node & {
   __typename?: 'Subscriber',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  subscriberToken?: Maybe<Scalars['String']>,
  author?: Maybe<Customer>,
  customerFirstName?: Maybe<Scalars['String']>,
  customerLastName?: Maybe<Scalars['String']>,
  customerPhone?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  tags?: Maybe<Scalars['String']>,
  status: Scalars['String'],
  type: Scalars['String'],
};

export type SubscriberList = PaginatedList & {
   __typename?: 'SubscriberList',
  items: Array<Subscriber>,
  totalItems: Scalars['Int'],
};

export type SubscriberListOptions = {
  skip: Scalars['Int'],
  take: Scalars['Int'],
};

export type TaxCategory = Node & {
   __typename?: 'TaxCategory',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
};

export type TaxRate = Node & {
   __typename?: 'TaxRate',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  enabled: Scalars['Boolean'],
  value: Scalars['Float'],
  category: TaxCategory,
  zone: Zone,
  customerGroup?: Maybe<CustomerGroup>,
};

export type TaxRateList = PaginatedList & {
   __typename?: 'TaxRateList',
  items: Array<TaxRate>,
  totalItems: Scalars['Int'],
};

export type TierPrice = {
   __typename?: 'TierPrice',
  productVariant: ProductVariant,
  quantity: Scalars['Int'],
  price: Scalars['Float'],
};

export type UpdateAddressInput = {
  id: Scalars['ID'],
  fullName?: Maybe<Scalars['String']>,
  company?: Maybe<Scalars['String']>,
  streetLine1?: Maybe<Scalars['String']>,
  streetLine2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  province?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  countryCode?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
  defaultShippingAddress?: Maybe<Scalars['Boolean']>,
  defaultBillingAddress?: Maybe<Scalars['Boolean']>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type UpdateCustomerInput = {
  title?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  phoneNumber?: Maybe<Scalars['String']>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type UpdateOrderCustomFieldsInput = {
  stateGroup?: Maybe<Scalars['String']>,
  dispatchedDate?: Maybe<Scalars['DateTime']>,
  daysOfSla?: Maybe<Scalars['String']>,
};

export type UpdateOrderInput = {
  customFields?: Maybe<UpdateOrderCustomFieldsInput>,
};

export type UpdateVendorBankInput = {
  id: Scalars['ID'],
  account: Scalars['String'],
  code: Scalars['String'],
  address: Scalars['String'],
  type: VendorAccountType,
  isCheck?: Maybe<Scalars['String']>,
};

export type UpdateVendorContactInput = {
  id: Scalars['ID'],
  contactName: Scalars['String'],
  pickupAddress: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
};

export type UpdateVendorInfoInput = {
  id: Scalars['ID'],
  brandName: Scalars['String'],
  regAddress: Scalars['String'],
  panno: Scalars['String'],
  GSTINID: Scalars['String'],
  state: Scalars['String'],
  ADHAR: Scalars['String'],
  aboutUs: Scalars['String'],
  staffEmail: Scalars['String'],
  phone: Scalars['String'],
  currencyCode?: Maybe<Scalars['String']>,
  defaultTaxZoneId?: Maybe<Scalars['Int']>,
  defaultShippingZoneId?: Maybe<Scalars['Int']>,
};

export type UpdateVendorInput = {
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  GSTINID: Scalars['String'],
  state: Scalars['String'],
  ownerName: Scalars['String'],
  ownerEmail: Scalars['String'],
};

export type UpdateVendorMarketingInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  emailAddress: Scalars['String'],
  phone: Scalars['String'],
};


export type User = Node & {
   __typename?: 'User',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  identifier: Scalars['String'],
  verified: Scalars['Boolean'],
  roles: Array<Role>,
  lastLogin?: Maybe<Scalars['DateTime']>,
  authenticationMethods: Array<AuthenticationMethod>,
  customFields?: Maybe<Scalars['JSON']>,
};

export type Vendor = Node & {
   __typename?: 'Vendor',
  id: Scalars['ID'],
  channel: Channel,
  user: User,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  GSTINID?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  ownerName?: Maybe<Scalars['String']>,
  ownerEmail?: Maybe<Scalars['String']>,
  verified?: Maybe<Scalars['Boolean']>,
  banks: Array<VendorBank>,
  contacts: Array<VendorContact>,
  info: Array<VendorInfo>,
  marketing: Array<VendorMarketingContact>,
};

export enum VendorAccountType {
  Current = 'CURRENT',
  Saving = 'SAVING'
}

export type VendorBank = Node & {
   __typename?: 'VendorBank',
  id: Scalars['ID'],
  account?: Maybe<Scalars['String']>,
  code?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  type?: Maybe<VendorAccountType>,
  isCheck?: Maybe<Scalars['String']>,
};

export type VendorBankInput = {
  vendorId: Scalars['String'],
  account: Scalars['String'],
  code: Scalars['String'],
  address: Scalars['String'],
  type: VendorAccountType,
  isCheck?: Maybe<Scalars['String']>,
};

export type VendorContact = Node & {
   __typename?: 'VendorContact',
  id: Scalars['ID'],
  contactName?: Maybe<Scalars['String']>,
  pickupAddress?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  startTime?: Maybe<Scalars['DateTime']>,
  endTime?: Maybe<Scalars['DateTime']>,
};

export type VendorContactInput = {
  vendorId: Scalars['String'],
  contactName: Scalars['String'],
  pickupAddress: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  startTime: Scalars['DateTime'],
  endTime: Scalars['DateTime'],
};

export type VendorInfo = Node & {
   __typename?: 'VendorInfo',
  id: Scalars['ID'],
  brandName: Scalars['String'],
  regAddress: Scalars['String'],
  panno: Scalars['String'],
  GSTINID: Scalars['String'],
  state: Scalars['String'],
  ADHAR: Scalars['String'],
  aboutUs: Scalars['String'],
  staffEmail: Scalars['String'],
  phone: Scalars['String'],
  currencyCode?: Maybe<Scalars['String']>,
  defaultTaxZoneId?: Maybe<Scalars['Int']>,
  defaultShippingZoneId?: Maybe<Scalars['Int']>,
};

export type VendorInfoInput = {
  vendorId: Scalars['String'],
  brandName: Scalars['String'],
  regAddress: Scalars['String'],
  panno: Scalars['String'],
  GSTINID: Scalars['String'],
  state: Scalars['String'],
  ADHAR: Scalars['String'],
  aboutUs: Scalars['String'],
  staffEmail: Scalars['String'],
  phone: Scalars['String'],
  currencyCode?: Maybe<Scalars['String']>,
  defaultTaxZoneId?: Maybe<Scalars['Int']>,
  defaultShippingZoneId?: Maybe<Scalars['Int']>,
};

export type VendorInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  phone: Scalars['String'],
  GSTINID: Scalars['String'],
  state: Scalars['String'],
  ownerName: Scalars['String'],
  ownerEmail: Scalars['String'],
  countryCode?: Maybe<Scalars['String']>,
};

export type VendorList = PaginatedList & {
   __typename?: 'VendorList',
  items: Array<Vendor>,
  totalItems: Scalars['Int'],
};

export type VendorMarketingContact = Node & {
   __typename?: 'VendorMarketingContact',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  emailAddress?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
};

export type VendorMarketingContactInput = {
  vendorId: Scalars['String'],
  name: Scalars['String'],
  emailAddress: Scalars['String'],
  phone: Scalars['String'],
};

export type VerifyResponse = {
   __typename?: 'VerifyResponse',
  result: VerifyResult,
  message?: Maybe<Scalars['String']>,
};

export enum VerifyResult {
  Success = 'SUCCESS',
  Fail = 'FAIL'
}

export type Zone = Node & {
   __typename?: 'Zone',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  members: Array<Country>,
};

