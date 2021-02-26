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

export type AddNewsletterInput = {
  newsletterId: Scalars['ID'];
  startAt: Scalars['DateTime'];
  subject: Scalars['String'];
  templateContent: Scalars['String'];
  templateCss: Scalars['String'];
};

export type AddNoteToCustomerInput = {
  id: Scalars['ID'];
  note: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type AddNoteToOrderInput = {
  id: Scalars['ID'];
  note: Scalars['String'];
  isPublic: Scalars['Boolean'];
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

export type AdministratorFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
};

export type AdministratorList = PaginatedList & {
   __typename?: 'AdministratorList';
  items: Array<Administrator>;
  totalItems: Scalars['Int'];
};

export type AdministratorListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<AdministratorSortParameter>;
  filter?: Maybe<AdministratorFilterParameter>;
};

export type AdministratorSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
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

export type AssetFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  type?: Maybe<StringOperators>;
  fileSize?: Maybe<NumberOperators>;
  mimeType?: Maybe<StringOperators>;
  width?: Maybe<NumberOperators>;
  height?: Maybe<NumberOperators>;
  source?: Maybe<StringOperators>;
  preview?: Maybe<StringOperators>;
};

export type AssetList = PaginatedList & {
   __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export type AssetListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<AssetSortParameter>;
  filter?: Maybe<AssetFilterParameter>;
};

export type AssetSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  fileSize?: Maybe<SortOrder>;
  mimeType?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  source?: Maybe<SortOrder>;
  preview?: Maybe<SortOrder>;
};

export enum AssetType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY'
}

export type AssignProductsToChannelInput = {
  productIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
  priceFactor?: Maybe<Scalars['Float']>;
};

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

export type CancelOrderInput = {
  orderId: Scalars['ID'];
  lines?: Maybe<Array<OrderLineInput>>;
  reason?: Maybe<Scalars['String']>;
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
  isPrivate: Scalars['Boolean'];
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
  isPrivate?: Maybe<BooleanOperators>;
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

export type ContactFilterParameter = {
  channelId?: Maybe<NumberOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  deletedAt?: Maybe<DateOperators>;
  sentAt?: Maybe<DateOperators>;
  subject?: Maybe<StringOperators>;
  message?: Maybe<StringOperators>;
  body?: Maybe<StringOperators>;
  authorName?: Maybe<StringOperators>;
  authorEmail?: Maybe<StringOperators>;
  authorPhone?: Maybe<StringOperators>;
  authorLocation?: Maybe<StringOperators>;
  authorIp?: Maybe<StringOperators>;
  adminUserId?: Maybe<NumberOperators>;
  error?: Maybe<StringOperators>;
  tags?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  adminNote?: Maybe<StringOperators>;
  response?: Maybe<StringOperators>;
  responseCreatedAt?: Maybe<DateOperators>;
  vendorId?: Maybe<NumberOperators>;
  params?: Maybe<StringOperators>;
};

export type ContactList = PaginatedList & {
   __typename?: 'ContactList';
  items: Array<Contact>;
  totalItems: Scalars['Int'];
};

export type ContactListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  sort?: Maybe<ContactSortParameter>;
  filter?: Maybe<ContactFilterParameter>;
};

export type ContactSortParameter = {
  channelId?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
  sentAt?: Maybe<SortOrder>;
  subject?: Maybe<SortOrder>;
  message?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
  authorName?: Maybe<SortOrder>;
  authorEmail?: Maybe<SortOrder>;
  authorPhone?: Maybe<SortOrder>;
  authorLocation?: Maybe<SortOrder>;
  authorIp?: Maybe<SortOrder>;
  adminUserId?: Maybe<SortOrder>;
  error?: Maybe<SortOrder>;
  tags?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  adminNote?: Maybe<SortOrder>;
  response?: Maybe<SortOrder>;
  responseCreatedAt?: Maybe<SortOrder>;
  vendorId?: Maybe<SortOrder>;
  params?: Maybe<SortOrder>;
};

export type Coordinate = {
   __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type CoordinateInput = {
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

export type CountryFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type CountryList = PaginatedList & {
   __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
};

export type CountryListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CountrySortParameter>;
  filter?: Maybe<CountryFilterParameter>;
};

export type CountrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type CountryTranslation = {
   __typename?: 'CountryTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type CountryTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
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

export type CreateAdministratorInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  emailAddress: Scalars['String'];
  password: Scalars['String'];
  roleIds: Array<Scalars['ID']>;
};

export type CreateAssetInput = {
  file: Scalars['Upload'];
};

export type CreateChannelInput = {
  code: Scalars['String'];
  token: Scalars['String'];
  defaultLanguageCode: LanguageCode;
  pricesIncludeTax: Scalars['Boolean'];
  currencyCode: CurrencyCode;
  defaultTaxZoneId: Scalars['ID'];
  defaultShippingZoneId: Scalars['ID'];
  shippingMethodIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreateCollectionInput = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  parentId?: Maybe<Scalars['ID']>;
  filters: Array<ConfigurableOperationInput>;
  translations: Array<CreateCollectionTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCollectionTranslationInput = {
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCountryInput = {
  code: Scalars['String'];
  translations: Array<CountryTranslationInput>;
  enabled: Scalars['Boolean'];
};

export type CreateCustomerGroupInput = {
  name: Scalars['String'];
  customerIds?: Maybe<Array<Scalars['ID']>>;
};

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetInput = {
  code: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  translations: Array<FacetTranslationInput>;
  values?: Maybe<Array<CreateFacetValueWithFacetInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetValueInput = {
  facetId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<FacetValueTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetValueWithFacetInput = {
  code: Scalars['String'];
  translations: Array<FacetValueTranslationInput>;
};

export type CreateGroupOptionInput = {
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
};

export type CreatePackageInput = {
  name: Scalars['String'];
  massUnit: MassUnit;
  distanceUnit: DistanceUnit;
  width: Scalars['Int'];
  height: Scalars['Int'];
  length: Scalars['Int'];
  weight: Scalars['Int'];
  enabled: Scalars['Boolean'];
};

export type CreateProductCustomFieldsInput = {
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

export type CreateProductInput = {
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  translations: Array<ProductTranslationInput>;
  customFields?: Maybe<CreateProductCustomFieldsInput>;
};

export type CreateProductOptionGroupInput = {
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
  options: Array<CreateGroupOptionInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductOptionInput = {
  productOptionGroupId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductVariantCustomFieldsInput = {
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type CreateProductVariantInput = {
  productId: Scalars['ID'];
  translations: Array<ProductVariantTranslationInput>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  sku: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  taxCategoryId?: Maybe<Scalars['ID']>;
  optionIds?: Maybe<Array<Scalars['ID']>>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  stockOnHand?: Maybe<Scalars['Int']>;
  trackInventory?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<CreateProductVariantCustomFieldsInput>;
};

export type CreateProductVariantOptionInput = {
  optionGroupId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<ProductOptionTranslationInput>;
};

export type CreatePromotionInput = {
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  conditions: Array<ConfigurableOperationInput>;
  actions: Array<ConfigurableOperationInput>;
};

export type CreateRoleInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
};

export type CreateShippingMethodInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  checker: ConfigurableOperationInput;
  calculator: ConfigurableOperationInput;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateTaxCategoryInput = {
  name: Scalars['String'];
};

export type CreateTaxRateInput = {
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  value: Scalars['Float'];
  categoryId: Scalars['ID'];
  zoneId: Scalars['ID'];
  customerGroupId?: Maybe<Scalars['ID']>;
};

export type CreateZoneInput = {
  name: Scalars['String'];
  memberIds?: Maybe<Array<Scalars['ID']>>;
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
  groups: Array<CustomerGroup>;
  history: HistoryEntryList;
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


export type CustomerHistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>;
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

export type CustomerGroupFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
};

export type CustomerGroupList = PaginatedList & {
   __typename?: 'CustomerGroupList';
  items: Array<CustomerGroup>;
  totalItems: Scalars['Int'];
};

export type CustomerGroupListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CustomerGroupSortParameter>;
  filter?: Maybe<CustomerGroupFilterParameter>;
};

export type CustomerGroupSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
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

export type DehliveryAccount = Node & {
   __typename?: 'DehliveryAccount';
  id: Scalars['ID'];
  client_name: Scalars['String'];
  user_name: Scalars['String'];
  api_key: Scalars['String'];
  shipping_mode: DehliveryShippingMode;
  hand_fee: Scalars['Int'];
};

export enum DehliveryShippingMode {
  Express = 'Express',
  Surface = 'Surface'
}

export type DeleteNewsletterQueueInput = {
  queueId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['String']>;
  finishAt?: Maybe<Scalars['String']>;
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

export enum DistanceUnit {
  Cm = 'cm',
  Ft = 'ft',
  In = 'in'
}

export type Facet = Node & {
   __typename?: 'Facet';
  isPrivate: Scalars['Boolean'];
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

export type FacetFilterParameter = {
  isPrivate?: Maybe<BooleanOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
};

export type FacetList = PaginatedList & {
   __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type FacetListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<FacetSortParameter>;
  filter?: Maybe<FacetFilterParameter>;
};

export type FacetResult = {
   __typename?: 'FacetResult';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  facetValues: Array<FacetValueResult>;
};

export type FacetSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
};

export type FacetTranslation = {
   __typename?: 'FacetTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
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

export type FacetValueTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
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

export type FulfillOrderInput = {
  lines: Array<OrderLineInput>;
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

export type Job = Node & {
   __typename?: 'Job';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  startedAt?: Maybe<Scalars['DateTime']>;
  settledAt?: Maybe<Scalars['DateTime']>;
  queueName: Scalars['String'];
  state: JobState;
  progress: Scalars['Float'];
  data?: Maybe<Scalars['JSON']>;
  result?: Maybe<Scalars['JSON']>;
  error?: Maybe<Scalars['JSON']>;
  isSettled: Scalars['Boolean'];
  duration: Scalars['Int'];
};

export type JobFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  startedAt?: Maybe<DateOperators>;
  settledAt?: Maybe<DateOperators>;
  queueName?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  progress?: Maybe<NumberOperators>;
  isSettled?: Maybe<BooleanOperators>;
  duration?: Maybe<NumberOperators>;
};

export type JobList = PaginatedList & {
   __typename?: 'JobList';
  items: Array<Job>;
  totalItems: Scalars['Int'];
};

export type JobListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<JobSortParameter>;
  filter?: Maybe<JobFilterParameter>;
};

export type JobQueue = {
   __typename?: 'JobQueue';
  name: Scalars['String'];
  running: Scalars['Boolean'];
};

export type JobSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  startedAt?: Maybe<SortOrder>;
  settledAt?: Maybe<SortOrder>;
  queueName?: Maybe<SortOrder>;
  progress?: Maybe<SortOrder>;
  duration?: Maybe<SortOrder>;
};

export enum JobState {
  Pending = 'PENDING',
  Running = 'RUNNING',
  Completed = 'COMPLETED',
  Retrying = 'RETRYING',
  Failed = 'FAILED'
}


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

export enum MassUnit {
  G = 'g',
  Kg = 'kg',
  Lb = 'lb',
  Oz = 'oz'
}

export type MoveCollectionInput = {
  collectionId: Scalars['ID'];
  parentId: Scalars['ID'];
  index: Scalars['Int'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createAdministrator: Administrator;
  updateAdministrator: Administrator;
  deleteAdministrator: DeletionResponse;
  assignRoleToAdministrator: Administrator;
  createAssets: Array<Asset>;
  updateAsset: Asset;
  deleteAsset: DeletionResponse;
  deleteAssets: DeletionResponse;
  login: LoginResult;
  authenticate: LoginResult;
  logout: Scalars['Boolean'];
  createChannel: Channel;
  updateChannel: Channel;
  deleteChannel: DeletionResponse;
  createCollection: Collection;
  updateCollection: Collection;
  deleteCollection: DeletionResponse;
  moveCollection: Collection;
  createCountry: Country;
  updateCountry: Country;
  deleteCountry: DeletionResponse;
  createCustomerGroup: CustomerGroup;
  updateCustomerGroup: CustomerGroup;
  deleteCustomerGroup: DeletionResponse;
  addCustomersToGroup: CustomerGroup;
  removeCustomersFromGroup: CustomerGroup;
  createCustomer: Customer;
  updateCustomer: Customer;
  deleteCustomer: DeletionResponse;
  createCustomerAddress: Address;
  updateCustomerAddress: Address;
  deleteCustomerAddress: Scalars['Boolean'];
  addNoteToCustomer: Customer;
  updateCustomerNote: HistoryEntry;
  deleteCustomerNote: DeletionResponse;
  createFacet: Facet;
  updateFacet: Facet;
  deleteFacet: DeletionResponse;
  createFacetValues: Array<FacetValue>;
  updateFacetValues: Array<FacetValue>;
  deleteFacetValues: Array<DeletionResponse>;
  updateGlobalSettings: GlobalSettings;
  importProducts?: Maybe<ImportInfo>;
  removeSettledJobs: Scalars['Int'];
  settlePayment: Payment;
  fulfillOrder: Fulfillment;
  cancelOrder: Order;
  refundOrder: Refund;
  settleRefund: Refund;
  addNoteToOrder: Order;
  updateOrderNote: HistoryEntry;
  deleteOrderNote: DeletionResponse;
  transitionOrderToState?: Maybe<Order>;
  setOrderCustomFields?: Maybe<Order>;
  updatePaymentMethod: PaymentMethod;
  createProductOptionGroup: ProductOptionGroup;
  updateProductOptionGroup: ProductOptionGroup;
  createProductOption: ProductOption;
  updateProductOption: ProductOption;
  reindex: Job;
  createProduct: Product;
  updateProduct: Product;
  deleteProduct: DeletionResponse;
  addOptionGroupToProduct: Product;
  removeOptionGroupFromProduct: Product;
  createProductVariants: Array<Maybe<ProductVariant>>;
  updateProductVariants: Array<Maybe<ProductVariant>>;
  deleteProductVariant: DeletionResponse;
  assignProductsToChannel: Array<Product>;
  removeProductsFromChannel: Array<Product>;
  createPromotion: Promotion;
  updatePromotion: Promotion;
  deletePromotion: DeletionResponse;
  createRole: Role;
  updateRole: Role;
  deleteRole: DeletionResponse;
  createShippingMethod: ShippingMethod;
  updateShippingMethod: ShippingMethod;
  deleteShippingMethod: DeletionResponse;
  createTaxCategory: TaxCategory;
  updateTaxCategory: TaxCategory;
  deleteTaxCategory: DeletionResponse;
  createTaxRate: TaxRate;
  updateTaxRate: TaxRate;
  deleteTaxRate: DeletionResponse;
  createZone: Zone;
  updateZone: Zone;
  deleteZone: DeletionResponse;
  addMembersToZone: Zone;
  removeMembersFromZone: Zone;
  updateProductReview: ProductReview;
  approveProductReview?: Maybe<ProductReview>;
  rejectProductReview?: Maybe<ProductReview>;
  updateContact: Contact;
  deleteContact: ContactDeleteReturn;
  updateSubscriber: Subscriber;
  unSubscriber: Subscriber;
  updateNewsletter: Newsletter;
  sendNewsletter: Newsletter;
  addNewsletterQueue: NewsletterQueue;
  sendNewsletterQueue: NewsletterQueue;
  deleteNewsletter: NewsletterDeleteReturn;
  deleteSubscriber: NewsletterDeleteReturn;
  deleteNewsletterQueue: NewsletterDeleteReturn;
  updateCrossSellingProducts: Scalars['Boolean'];
  updateUpSellingProducts: Scalars['Boolean'];
  updateRelatedProducts: Scalars['Boolean'];
  autoRelatedProducts: Scalars['Boolean'];
  updateProductVariantTierPrices: Scalars['Boolean'];
  updateProductVariantTierPricesBySku: Scalars['Boolean'];
  createVendor?: Maybe<Vendor>;
  createVendorInfo?: Maybe<VendorInfo>;
  createVendorBank?: Maybe<VendorBank>;
  createVendorContact?: Maybe<VendorContact>;
  createVendorMarketingContact?: Maybe<VendorMarketingContact>;
  deleteVendor: DeletionResponse;
  updateVendor?: Maybe<Vendor>;
  updateVendorInfo?: Maybe<VendorInfo>;
  updateVendorBank?: Maybe<VendorBank>;
  updateVendorContact?: Maybe<VendorContact>;
  updateVendorMaketingContact?: Maybe<VendorMarketingContact>;
  verifyVendorAccount: VerifyResponse;
  createPackage: Package;
  updatePackage: Package;
  updateDehliveryAccount: DehliveryAccount;
};


export type MutationCreateAdministratorArgs = {
  input: CreateAdministratorInput;
};


export type MutationUpdateAdministratorArgs = {
  input: UpdateAdministratorInput;
};


export type MutationDeleteAdministratorArgs = {
  id: Scalars['ID'];
};


export type MutationAssignRoleToAdministratorArgs = {
  administratorId: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationCreateAssetsArgs = {
  input: Array<CreateAssetInput>;
};


export type MutationUpdateAssetArgs = {
  input: UpdateAssetInput;
};


export type MutationDeleteAssetArgs = {
  id: Scalars['ID'];
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteAssetsArgs = {
  ids: Array<Scalars['ID']>;
  force?: Maybe<Scalars['Boolean']>;
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


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['ID'];
};


export type MutationMoveCollectionArgs = {
  input: MoveCollectionInput;
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationDeleteCountryArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCustomerGroupArgs = {
  input: CreateCustomerGroupInput;
};


export type MutationUpdateCustomerGroupArgs = {
  input: UpdateCustomerGroupInput;
};


export type MutationDeleteCustomerGroupArgs = {
  id: Scalars['ID'];
};


export type MutationAddCustomersToGroupArgs = {
  customerGroupId: Scalars['ID'];
  customerIds: Array<Scalars['ID']>;
};


export type MutationRemoveCustomersFromGroupArgs = {
  customerGroupId: Scalars['ID'];
  customerIds: Array<Scalars['ID']>;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
  password?: Maybe<Scalars['String']>;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCustomerAddressArgs = {
  customerId: Scalars['ID'];
  input: CreateAddressInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID'];
};


export type MutationAddNoteToCustomerArgs = {
  input: AddNoteToCustomerInput;
};


export type MutationUpdateCustomerNoteArgs = {
  input: UpdateCustomerNoteInput;
};


export type MutationDeleteCustomerNoteArgs = {
  id: Scalars['ID'];
};


export type MutationCreateFacetArgs = {
  input: CreateFacetInput;
};


export type MutationUpdateFacetArgs = {
  input: UpdateFacetInput;
};


export type MutationDeleteFacetArgs = {
  id: Scalars['ID'];
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateFacetValuesArgs = {
  input: Array<CreateFacetValueInput>;
};


export type MutationUpdateFacetValuesArgs = {
  input: Array<UpdateFacetValueInput>;
};


export type MutationDeleteFacetValuesArgs = {
  ids: Array<Scalars['ID']>;
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateGlobalSettingsArgs = {
  input: UpdateGlobalSettingsInput;
};


export type MutationImportProductsArgs = {
  csvFile: Scalars['Upload'];
};


export type MutationRemoveSettledJobsArgs = {
  queueNames?: Maybe<Array<Scalars['String']>>;
  olderThan?: Maybe<Scalars['DateTime']>;
};


export type MutationSettlePaymentArgs = {
  id: Scalars['ID'];
};


export type MutationFulfillOrderArgs = {
  input: FulfillOrderInput;
};


export type MutationCancelOrderArgs = {
  input: CancelOrderInput;
};


export type MutationRefundOrderArgs = {
  input: RefundOrderInput;
};


export type MutationSettleRefundArgs = {
  input: SettleRefundInput;
};


export type MutationAddNoteToOrderArgs = {
  input: AddNoteToOrderInput;
};


export type MutationUpdateOrderNoteArgs = {
  input: UpdateOrderNoteInput;
};


export type MutationDeleteOrderNoteArgs = {
  id: Scalars['ID'];
};


export type MutationTransitionOrderToStateArgs = {
  id: Scalars['ID'];
  state: Scalars['String'];
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdatePaymentMethodArgs = {
  input: UpdatePaymentMethodInput;
};


export type MutationCreateProductOptionGroupArgs = {
  input: CreateProductOptionGroupInput;
};


export type MutationUpdateProductOptionGroupArgs = {
  input: UpdateProductOptionGroupInput;
};


export type MutationCreateProductOptionArgs = {
  input: CreateProductOptionInput;
};


export type MutationUpdateProductOptionArgs = {
  input: UpdateProductOptionInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationAddOptionGroupToProductArgs = {
  productId: Scalars['ID'];
  optionGroupId: Scalars['ID'];
};


export type MutationRemoveOptionGroupFromProductArgs = {
  productId: Scalars['ID'];
  optionGroupId: Scalars['ID'];
};


export type MutationCreateProductVariantsArgs = {
  input: Array<CreateProductVariantInput>;
};


export type MutationUpdateProductVariantsArgs = {
  input: Array<UpdateProductVariantInput>;
};


export type MutationDeleteProductVariantArgs = {
  id: Scalars['ID'];
};


export type MutationAssignProductsToChannelArgs = {
  input: AssignProductsToChannelInput;
};


export type MutationRemoveProductsFromChannelArgs = {
  input: RemoveProductsFromChannelInput;
};


export type MutationCreatePromotionArgs = {
  input: CreatePromotionInput;
};


export type MutationUpdatePromotionArgs = {
  input: UpdatePromotionInput;
};


export type MutationDeletePromotionArgs = {
  id: Scalars['ID'];
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationCreateShippingMethodArgs = {
  input: CreateShippingMethodInput;
};


export type MutationUpdateShippingMethodArgs = {
  input: UpdateShippingMethodInput;
};


export type MutationDeleteShippingMethodArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTaxCategoryArgs = {
  input: CreateTaxCategoryInput;
};


export type MutationUpdateTaxCategoryArgs = {
  input: UpdateTaxCategoryInput;
};


export type MutationDeleteTaxCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTaxRateArgs = {
  input: CreateTaxRateInput;
};


export type MutationUpdateTaxRateArgs = {
  input: UpdateTaxRateInput;
};


export type MutationDeleteTaxRateArgs = {
  id: Scalars['ID'];
};


export type MutationCreateZoneArgs = {
  input: CreateZoneInput;
};


export type MutationUpdateZoneArgs = {
  input: UpdateZoneInput;
};


export type MutationDeleteZoneArgs = {
  id: Scalars['ID'];
};


export type MutationAddMembersToZoneArgs = {
  zoneId: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
};


export type MutationRemoveMembersFromZoneArgs = {
  zoneId: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
};


export type MutationUpdateProductReviewArgs = {
  input: UpdateProductReviewInput;
};


export type MutationApproveProductReviewArgs = {
  id: Scalars['ID'];
};


export type MutationRejectProductReviewArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateContactArgs = {
  input: UpdateContactInput;
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSubscriberArgs = {
  input: UpdateSubscriberInput;
};


export type MutationUnSubscriberArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateNewsletterArgs = {
  input: UpdateNewsletterInput;
};


export type MutationSendNewsletterArgs = {
  input: SendNewsletterInput;
};


export type MutationAddNewsletterQueueArgs = {
  input: AddNewsletterInput;
};


export type MutationSendNewsletterQueueArgs = {
  input: SendNewsletterQueueInput;
};


export type MutationDeleteNewsletterArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSubscriberArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNewsletterQueueArgs = {
  input: DeleteNewsletterQueueInput;
};


export type MutationUpdateCrossSellingProductsArgs = {
  productId: Scalars['ID'];
  productIds: Array<Scalars['ID']>;
};


export type MutationUpdateUpSellingProductsArgs = {
  productId: Scalars['ID'];
  productIds: Array<Scalars['ID']>;
};


export type MutationUpdateRelatedProductsArgs = {
  productId: Scalars['ID'];
  productIds: Array<Scalars['ID']>;
};


export type MutationAutoRelatedProductsArgs = {
  productId: Scalars['ID'];
};


export type MutationUpdateProductVariantTierPricesArgs = {
  productVariantId: Scalars['ID'];
  discounts: Array<TierPriceInput>;
};


export type MutationUpdateProductVariantTierPricesBySkuArgs = {
  productVariantSku: Scalars['String'];
  discounts: Array<TierPriceInput>;
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


export type MutationDeleteVendorArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateVendorArgs = {
  input: UpdateVendorInput;
};


export type MutationUpdateVendorInfoArgs = {
  input: UpdateVendorInfoInput;
};


export type MutationUpdateVendorBankArgs = {
  input: UpdateVendorBankInput;
};


export type MutationUpdateVendorContactArgs = {
  input: UpdateVendorContactInput;
};


export type MutationUpdateVendorMaketingContactArgs = {
  input: UpdateVendorMarketingInput;
};


export type MutationVerifyVendorAccountArgs = {
  token: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};


export type MutationCreatePackageArgs = {
  input: CreatePackageInput;
};


export type MutationUpdatePackageArgs = {
  input: UpdatePackageInput;
};


export type MutationUpdateDehliveryAccountArgs = {
  input: UpdateDehliveryAccountInput;
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

export type NewsletterFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  subject?: Maybe<StringOperators>;
  customerGroupId?: Maybe<NumberOperators>;
  priority?: Maybe<NumberOperators>;
  template_name?: Maybe<StringOperators>;
  templateContent?: Maybe<StringOperators>;
  templateCss?: Maybe<StringOperators>;
  params?: Maybe<StringOperators>;
  status?: Maybe<NumberOperators>;
  type?: Maybe<StringOperators>;
};

export type NewsletterList = PaginatedList & {
   __typename?: 'NewsletterList';
  items: Array<Newsletter>;
  totalItems: Scalars['Int'];
};

export type NewsletterListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  sort?: Maybe<NewsletterSortParameter>;
  filter?: Maybe<NewsletterFilterParameter>;
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

export type NewsletterSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  subject?: Maybe<SortOrder>;
  customerGroupId?: Maybe<SortOrder>;
  priority?: Maybe<SortOrder>;
  template_name?: Maybe<SortOrder>;
  templateContent?: Maybe<SortOrder>;
  templateCss?: Maybe<SortOrder>;
  params?: Maybe<SortOrder>;
  status?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
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
  nextStates: Array<Scalars['String']>;
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

export type OrderLineInput = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
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

export type Package = Node & {
   __typename?: 'Package';
  id: Scalars['ID'];
  name: Scalars['String'];
  massUnit: MassUnit;
  distanceUnit: DistanceUnit;
  width: Scalars['Int'];
  height: Scalars['Int'];
  length: Scalars['Int'];
  weight: Scalars['Int'];
  enabled: Scalars['Boolean'];
};

export type PackageFilterParameter = {
  name?: Maybe<StringOperators>;
  massUnit?: Maybe<StringOperators>;
  distanceUnit?: Maybe<StringOperators>;
  width?: Maybe<NumberOperators>;
  height?: Maybe<NumberOperators>;
  length?: Maybe<NumberOperators>;
  weight?: Maybe<NumberOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type PackageList = PaginatedList & {
   __typename?: 'PackageList';
  items: Array<Package>;
  totalItems: Scalars['Int'];
};

export type PackageListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<PackageSortParameter>;
  filter?: Maybe<PackageFilterParameter>;
};

export type PackageSortParameter = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  length?: Maybe<SortOrder>;
  weight?: Maybe<SortOrder>;
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

export type PaymentMethodFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type PaymentMethodList = PaginatedList & {
   __typename?: 'PaymentMethodList';
  items: Array<PaymentMethod>;
  totalItems: Scalars['Int'];
};

export type PaymentMethodListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<PaymentMethodSortParameter>;
  filter?: Maybe<PaymentMethodFilterParameter>;
};

export type PaymentMethodSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
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
  enabled: Scalars['Boolean'];
  channels: Array<Channel>;
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
  enabled?: Maybe<BooleanOperators>;
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

export type ProductOptionGroupTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionTranslation = {
   __typename?: 'ProductOptionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductOptionTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
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

export type ProductTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductVariant = Node & {
   __typename?: 'ProductVariant';
  enabled: Scalars['Boolean'];
  stockOnHand: Scalars['Int'];
  trackInventory: Scalars['Boolean'];
  stockMovements: StockMovementList;
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


export type ProductVariantStockMovementsArgs = {
  options?: Maybe<StockMovementListOptions>;
};

export type ProductVariantCustomFields = {
   __typename?: 'ProductVariantCustomFields';
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type ProductVariantFilterParameter = {
  enabled?: Maybe<BooleanOperators>;
  stockOnHand?: Maybe<NumberOperators>;
  trackInventory?: Maybe<BooleanOperators>;
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
  stockOnHand?: Maybe<SortOrder>;
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

export type ProductVariantTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
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

export type PromotionFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  startsAt?: Maybe<DateOperators>;
  endsAt?: Maybe<DateOperators>;
  couponCode?: Maybe<StringOperators>;
  perCustomerUsageLimit?: Maybe<NumberOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type PromotionList = PaginatedList & {
   __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type PromotionListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<PromotionSortParameter>;
  filter?: Maybe<PromotionFilterParameter>;
};

export type PromotionSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  startsAt?: Maybe<SortOrder>;
  endsAt?: Maybe<SortOrder>;
  couponCode?: Maybe<SortOrder>;
  perCustomerUsageLimit?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type Query = {
   __typename?: 'Query';
  administrators: AdministratorList;
  administrator?: Maybe<Administrator>;
  assets: AssetList;
  asset?: Maybe<Asset>;
  me?: Maybe<CurrentUser>;
  channels: Array<Channel>;
  channel?: Maybe<Channel>;
  activeChannel: Channel;
  collections: CollectionList;
  collection?: Maybe<Collection>;
  collectionFilters: Array<ConfigurableOperationDefinition>;
  countries: CountryList;
  country?: Maybe<Country>;
  customerGroups: CustomerGroupList;
  customerGroup?: Maybe<CustomerGroup>;
  customers: CustomerList;
  customer?: Maybe<Customer>;
  facets: FacetList;
  facet?: Maybe<Facet>;
  globalSettings: GlobalSettings;
  job?: Maybe<Job>;
  jobs: JobList;
  jobsById: Array<Job>;
  jobQueues: Array<JobQueue>;
  order?: Maybe<Order>;
  orders: OrderList;
  paymentMethods: PaymentMethodList;
  paymentMethod?: Maybe<PaymentMethod>;
  productOptionGroups: Array<ProductOptionGroup>;
  productOptionGroup?: Maybe<ProductOptionGroup>;
  search: SearchResponse;
  products: ProductList;
  product?: Maybe<Product>;
  productVariant?: Maybe<ProductVariant>;
  promotion?: Maybe<Promotion>;
  promotions: PromotionList;
  promotionConditions: Array<ConfigurableOperationDefinition>;
  promotionActions: Array<ConfigurableOperationDefinition>;
  roles: RoleList;
  role?: Maybe<Role>;
  shippingMethods: ShippingMethodList;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingEligibilityCheckers: Array<ConfigurableOperationDefinition>;
  shippingCalculators: Array<ConfigurableOperationDefinition>;
  testShippingMethod: TestShippingMethodResult;
  testEligibleShippingMethods: Array<ShippingMethodQuote>;
  taxCategories: Array<TaxCategory>;
  taxCategory?: Maybe<TaxCategory>;
  taxRates: TaxRateList;
  taxRate?: Maybe<TaxRate>;
  zones: Array<Zone>;
  zone?: Maybe<Zone>;
  productReviews: ProductReviewList;
  productReview?: Maybe<ProductReview>;
  contacts: ContactList;
  contact?: Maybe<Contact>;
  subscribers: SubscriberList;
  subscriber?: Maybe<Subscriber>;
  newsletters: NewsletterList;
  newsletter?: Maybe<Newsletter>;
  productRecommendations: Array<ProductRecommendation>;
  productTierPrices: Array<TierPrice>;
  productGrid: ProductList;
  getOrderListByChannel: OrderList;
  getVendorByBrand?: Maybe<Vendor>;
  getVendorByEmail?: Maybe<Vendor>;
  vendors: VendorList;
  activeVendor?: Maybe<Vendor>;
  getVendorByID?: Maybe<Vendor>;
  packages: PackageList;
  package: Package;
  dehliveryAccount?: Maybe<DehliveryAccount>;
};


export type QueryAdministratorsArgs = {
  options?: Maybe<AdministratorListOptions>;
};


export type QueryAdministratorArgs = {
  id: Scalars['ID'];
};


export type QueryAssetsArgs = {
  options?: Maybe<AssetListOptions>;
};


export type QueryAssetArgs = {
  id: Scalars['ID'];
};


export type QueryChannelArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionsArgs = {
  options?: Maybe<CollectionListOptions>;
};


export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryCountriesArgs = {
  options?: Maybe<CountryListOptions>;
};


export type QueryCountryArgs = {
  id: Scalars['ID'];
};


export type QueryCustomerGroupsArgs = {
  options?: Maybe<CustomerGroupListOptions>;
};


export type QueryCustomerGroupArgs = {
  id: Scalars['ID'];
};


export type QueryCustomersArgs = {
  options?: Maybe<CustomerListOptions>;
};


export type QueryCustomerArgs = {
  id: Scalars['ID'];
};


export type QueryFacetsArgs = {
  options?: Maybe<FacetListOptions>;
};


export type QueryFacetArgs = {
  id: Scalars['ID'];
};


export type QueryJobArgs = {
  jobId: Scalars['ID'];
};


export type QueryJobsArgs = {
  options?: Maybe<JobListOptions>;
};


export type QueryJobsByIdArgs = {
  jobIds: Array<Scalars['ID']>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrdersArgs = {
  options?: Maybe<OrderListOptions>;
};


export type QueryPaymentMethodsArgs = {
  options?: Maybe<PaymentMethodListOptions>;
};


export type QueryPaymentMethodArgs = {
  id: Scalars['ID'];
};


export type QueryProductOptionGroupsArgs = {
  filterTerm?: Maybe<Scalars['String']>;
};


export type QueryProductOptionGroupArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  input: SearchInput;
};


export type QueryProductsArgs = {
  options?: Maybe<ProductListOptions>;
};


export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryProductVariantArgs = {
  id: Scalars['ID'];
};


export type QueryPromotionArgs = {
  id: Scalars['ID'];
};


export type QueryPromotionsArgs = {
  options?: Maybe<PromotionListOptions>;
};


export type QueryRolesArgs = {
  options?: Maybe<RoleListOptions>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryShippingMethodsArgs = {
  options?: Maybe<ShippingMethodListOptions>;
};


export type QueryShippingMethodArgs = {
  id: Scalars['ID'];
};


export type QueryTestShippingMethodArgs = {
  input: TestShippingMethodInput;
};


export type QueryTestEligibleShippingMethodsArgs = {
  input: TestEligibleShippingMethodsInput;
};


export type QueryTaxCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryTaxRatesArgs = {
  options?: Maybe<TaxRateListOptions>;
};


export type QueryTaxRateArgs = {
  id: Scalars['ID'];
};


export type QueryZoneArgs = {
  id: Scalars['ID'];
};


export type QueryProductReviewsArgs = {
  options?: Maybe<ProductReviewListOptions>;
};


export type QueryProductReviewArgs = {
  id: Scalars['ID'];
};


export type QueryContactsArgs = {
  options?: Maybe<ContactListOptions>;
};


export type QueryContactArgs = {
  id: Scalars['ID'];
};


export type QuerySubscribersArgs = {
  options?: Maybe<SubscriberListOptions>;
};


export type QuerySubscriberArgs = {
  id: Scalars['ID'];
};


export type QueryNewslettersArgs = {
  options?: Maybe<NewsletterListOptions>;
};


export type QueryNewsletterArgs = {
  id: Scalars['ID'];
};


export type QueryProductRecommendationsArgs = {
  productId: Scalars['ID'];
};


export type QueryProductTierPricesArgs = {
  productId: Scalars['ID'];
};


export type QueryProductGridArgs = {
  options?: Maybe<ProductListOptions>;
};


export type QueryGetOrderListByChannelArgs = {
  options?: Maybe<OrderListOptions>;
};


export type QueryGetVendorByBrandArgs = {
  brand: Scalars['String'];
};


export type QueryGetVendorByEmailArgs = {
  email: Scalars['String'];
};


export type QueryVendorsArgs = {
  options?: Maybe<VendorListOptions>;
};


export type QueryGetVendorByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPackagesArgs = {
  options?: Maybe<PackageListOptions>;
};


export type QueryPackageArgs = {
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

export type RefundOrderInput = {
  lines: Array<OrderLineInput>;
  shipping: Scalars['Int'];
  adjustment: Scalars['Int'];
  paymentId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
};

export type RemoveProductsFromChannelInput = {
  productIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
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

export type RoleFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
};

export type RoleList = PaginatedList & {
   __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type RoleListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<RoleSortParameter>;
  filter?: Maybe<RoleFilterParameter>;
};

export type RoleSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
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
};

export type SearchResult = {
   __typename?: 'SearchResult';
  enabled: Scalars['Boolean'];
  channelIds: Array<Scalars['ID']>;
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

export type SendNewsletterInput = {
  email: Scalars['String'];
  newsletterId: Scalars['ID'];
};

export type SendNewsletterQueueInput = {
  queueId: Scalars['ID'];
};

export type ServerConfig = {
   __typename?: 'ServerConfig';
  orderProcess: Array<OrderProcessState>;
  permittedAssetTypes: Array<Scalars['String']>;
  customFieldConfig: CustomFields;
};

export type SettleRefundInput = {
  id: Scalars['ID'];
  transactionId: Scalars['String'];
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

export type ShippingMethodFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
};

export type ShippingMethodList = PaginatedList & {
   __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ShippingMethodSortParameter>;
  filter?: Maybe<ShippingMethodFilterParameter>;
};

export type ShippingMethodQuote = {
   __typename?: 'ShippingMethodQuote';
  id: Scalars['ID'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  description: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
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

export type StockMovementListOptions = {
  type?: Maybe<StockMovementType>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
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

export type SubscriberFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  subscriberToken?: Maybe<StringOperators>;
  customerFirstName?: Maybe<StringOperators>;
  customerLastName?: Maybe<StringOperators>;
  customerPhone?: Maybe<StringOperators>;
  gender?: Maybe<StringOperators>;
  email?: Maybe<StringOperators>;
  tags?: Maybe<StringOperators>;
  status?: Maybe<StringOperators>;
  type?: Maybe<StringOperators>;
};

export type SubscriberList = PaginatedList & {
   __typename?: 'SubscriberList';
  items: Array<Subscriber>;
  totalItems: Scalars['Int'];
};

export type SubscriberListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  sort?: Maybe<SubscriberSortParameter>;
  filter?: Maybe<SubscriberFilterParameter>;
};

export type SubscriberSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  subscriberToken?: Maybe<SortOrder>;
  customerFirstName?: Maybe<SortOrder>;
  customerLastName?: Maybe<SortOrder>;
  customerPhone?: Maybe<SortOrder>;
  gender?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  tags?: Maybe<SortOrder>;
  status?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
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

export type TaxRateFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
  value?: Maybe<NumberOperators>;
};

export type TaxRateList = PaginatedList & {
   __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int'];
};

export type TaxRateListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<TaxRateSortParameter>;
  filter?: Maybe<TaxRateFilterParameter>;
};

export type TaxRateSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  value?: Maybe<SortOrder>;
};

export type TestEligibleShippingMethodsInput = {
  shippingAddress: CreateAddressInput;
  lines: Array<TestShippingMethodOrderLineInput>;
};

export type TestShippingMethodInput = {
  checker: ConfigurableOperationInput;
  calculator: ConfigurableOperationInput;
  shippingAddress: CreateAddressInput;
  lines: Array<TestShippingMethodOrderLineInput>;
};

export type TestShippingMethodOrderLineInput = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type TestShippingMethodQuote = {
   __typename?: 'TestShippingMethodQuote';
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  description: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type TestShippingMethodResult = {
   __typename?: 'TestShippingMethodResult';
  eligible: Scalars['Boolean'];
  quote?: Maybe<TestShippingMethodQuote>;
};

export type TierPrice = {
   __typename?: 'TierPrice';
  productVariant: ProductVariant;
  quantity: Scalars['Int'];
  price: Scalars['Float'];
};

export type TierPriceInput = {
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

export type UpdateAdministratorInput = {
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roleIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateAssetInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  focalPoint?: Maybe<CoordinateInput>;
};

export type UpdateChannelInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  defaultLanguageCode?: Maybe<LanguageCode>;
  pricesIncludeTax?: Maybe<Scalars['Boolean']>;
  currencyCode?: Maybe<CurrencyCode>;
  defaultTaxZoneId?: Maybe<Scalars['ID']>;
  defaultShippingZoneId?: Maybe<Scalars['ID']>;
  shippingMethodIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UpdateCollectionInput = {
  id: Scalars['ID'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  filters?: Maybe<Array<ConfigurableOperationInput>>;
  translations?: Maybe<Array<UpdateCollectionTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCollectionTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateContactInput = {
  id: Scalars['ID'];
  subject?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  response?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  adminUserId?: Maybe<Scalars['Int']>;
  adminNote?: Maybe<Scalars['String']>;
};

export type UpdateCountryInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<CountryTranslationInput>>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type UpdateCustomerGroupInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateCustomerInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCustomerNoteInput = {
  noteId: Scalars['ID'];
  note: Scalars['String'];
};

export type UpdateDehliveryAccountInput = {
  id?: Maybe<Scalars['ID']>;
  client_name: Scalars['String'];
  user_name: Scalars['String'];
  api_key: Scalars['String'];
  shipping_mode: DehliveryShippingMode;
  hand_fee: Scalars['Int'];
};

export type UpdateFacetInput = {
  id: Scalars['ID'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<FacetTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateFacetValueInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<FacetValueTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateGlobalSettingsCustomFieldsInput = {
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

export type UpdateGlobalSettingsInput = {
  availableLanguages?: Maybe<Array<LanguageCode>>;
  trackInventory?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<UpdateGlobalSettingsCustomFieldsInput>;
};

export type UpdateNewsletterInput = {
  id: Scalars['ID'];
  customerGroupId?: Maybe<Scalars['ID']>;
  template_name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  templateContent?: Maybe<Scalars['String']>;
  templateCss?: Maybe<Scalars['String']>;
  params?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  type: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
};

export type UpdateOrderInput = {
  id: Scalars['ID'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateOrderNoteInput = {
  noteId: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type UpdatePackageInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  massUnit?: Maybe<MassUnit>;
  distanceUnit?: Maybe<DistanceUnit>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type UpdatePaymentMethodInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  configArgs?: Maybe<Array<ConfigArgInput>>;
};

export type UpdateProductCustomFieldsInput = {
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

export type UpdateProductInput = {
  id: Scalars['ID'];
  enabled?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  translations?: Maybe<Array<ProductTranslationInput>>;
  customFields?: Maybe<UpdateProductCustomFieldsInput>;
};

export type UpdateProductOptionGroupInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<ProductOptionGroupTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductOptionInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<ProductOptionGroupTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductReviewInput = {
  id: Scalars['ID'];
  summary?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  response?: Maybe<Scalars['String']>;
};

export type UpdateProductVariantCustomFieldsInput = {
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type UpdateProductVariantInput = {
  id: Scalars['ID'];
  enabled?: Maybe<Scalars['Boolean']>;
  translations?: Maybe<Array<ProductVariantTranslationInput>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  sku?: Maybe<Scalars['String']>;
  taxCategoryId?: Maybe<Scalars['ID']>;
  price?: Maybe<Scalars['Int']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  stockOnHand?: Maybe<Scalars['Int']>;
  trackInventory?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<UpdateProductVariantCustomFieldsInput>;
};

export type UpdatePromotionInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  conditions?: Maybe<Array<ConfigurableOperationInput>>;
  actions?: Maybe<Array<ConfigurableOperationInput>>;
};

export type UpdateRoleInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateShippingMethodInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  checker?: Maybe<ConfigurableOperationInput>;
  calculator?: Maybe<ConfigurableOperationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateSubscriberInput = {
  id: Scalars['ID'];
  customerId?: Maybe<Scalars['ID']>;
  customerFirstName?: Maybe<Scalars['String']>;
  customerLastName?: Maybe<Scalars['String']>;
  customerPhone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type UpdateTaxCategoryInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateTaxRateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
  enabled?: Maybe<Scalars['Boolean']>;
  categoryId?: Maybe<Scalars['ID']>;
  zoneId?: Maybe<Scalars['ID']>;
  customerGroupId?: Maybe<Scalars['ID']>;
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

export type UpdateZoneInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
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

export type VendorFilterParameter = {
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  email?: Maybe<StringOperators>;
  phone?: Maybe<StringOperators>;
  GSTINID?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  ownerName?: Maybe<StringOperators>;
  ownerEmail?: Maybe<StringOperators>;
  verified?: Maybe<BooleanOperators>;
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

export type VendorListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<VendorSortParameter>;
  filter?: Maybe<VendorFilterParameter>;
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

export type VendorSortParameter = {
  id?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  phone?: Maybe<SortOrder>;
  GSTINID?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  ownerName?: Maybe<SortOrder>;
  ownerEmail?: Maybe<SortOrder>;
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

