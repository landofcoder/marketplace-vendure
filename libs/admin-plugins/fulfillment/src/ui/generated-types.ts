/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  administrators: AdministratorList;
  administrator?: Maybe<Administrator>;
  activeAdministrator?: Maybe<Administrator>;
  /** Get a list of Assets */
  assets: AssetList;
  /** Get a single Asset by id */
  asset?: Maybe<Asset>;
  me?: Maybe<CurrentUser>;
  channels: Array<Channel>;
  channel?: Maybe<Channel>;
  activeChannel: Channel;
  collections: CollectionList;
  /** Get a Collection either by id or slug. If neither id nor slug is speicified, an error will result. */
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
  /** Get a Product either by id or slug. If neither id nor slug is speicified, an error will result. */
  product?: Maybe<Product>;
  /** Get a ProductVariant by id */
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
  pincodes: PincodeList;
  pincode?: Maybe<Pincode>;
  checkPincode: Pincode;
  shippingCountry?: Maybe<ShippingCountryPrice>;
  shippingCountries: ShippingCountryPriceList;
  productGrid: ProductList;
  getOrderListByChannel: OrderList;
  getVendorByBrand?: Maybe<Vendor>;
  getVendorByEmail?: Maybe<Vendor>;
  vendors: VendorList;
  activeVendor?: Maybe<Vendor>;
  getVendorByID?: Maybe<Vendor>;
  dailyOrders: DailyOrderList;
  testDailyOrders?: Maybe<DailyOrderOutput>;
  delhiveryAccount?: Maybe<DelhiveryAccount>;
  delhiveryWarehouses: DelhiveryWarehouseList;
  delhiveryWarehouse?: Maybe<DelhiveryWarehouse>;
  delhiveryWarehouseByChannelId?: Maybe<DelhiveryWarehouse>;
  delhiveryWarehouseByPickupName?: Maybe<DelhiveryWarehouse>;
  getPackingSlip?: Maybe<PackingSlip>;
  countOrderByStatus?: Maybe<Scalars['JSON']>;
  ecomexpressAccountConfig?: Maybe<EcomExpressAccount>;
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


export type QueryPincodesArgs = {
  options?: Maybe<PincodeListOptions>;
};


export type QueryPincodeArgs = {
  id: Scalars['ID'];
};


export type QueryCheckPincodeArgs = {
  input: CheckPincodeInput;
};


export type QueryShippingCountryArgs = {
  id: Scalars['ID'];
};


export type QueryShippingCountriesArgs = {
  options?: Maybe<ShippingCountryPriceListOptions>;
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


export type QueryDailyOrdersArgs = {
  input: DailyOrderInput;
};


export type QueryTestDailyOrdersArgs = {
  input: DailyOrderInput;
};


export type QueryDelhiveryWarehousesArgs = {
  options?: Maybe<DelhiveryWarehouseListOptions>;
};


export type QueryDelhiveryWarehouseArgs = {
  id: Scalars['ID'];
};


export type QueryDelhiveryWarehouseByChannelIdArgs = {
  input: DelhiveryWarehouseByChannelId;
};


export type QueryDelhiveryWarehouseByPickupNameArgs = {
  input: DelhiveryWarehouseByPickupName;
};


export type QueryGetPackingSlipArgs = {
  trackingCode: Scalars['String'];
};


export type QueryCountOrderByStatusArgs = {
  filter?: Maybe<OrderFilterCondition>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new Administrator */
  createAdministrator: Administrator;
  /** Update an existing Administrator */
  updateAdministrator: Administrator;
  /** Update the active (currently logged-in) Administrator */
  updateActiveAdministrator: Administrator;
  /** Delete an Administrator */
  deleteAdministrator: DeletionResponse;
  /** Assign a Role to an Administrator */
  assignRoleToAdministrator: Administrator;
  /** Create a new Asset */
  createAssets: Array<CreateAssetResult>;
  /** Update an existing Asset */
  updateAsset: Asset;
  /** Delete an Asset */
  deleteAsset: DeletionResponse;
  /** Delete multiple Assets */
  deleteAssets: DeletionResponse;
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  logout: Success;
  /** Create a new Channel */
  createChannel: CreateChannelResult;
  /** Update an existing Channel */
  updateChannel: UpdateChannelResult;
  /** Delete a Channel */
  deleteChannel: DeletionResponse;
  /** Create a new Collection */
  createCollection: Collection;
  /** Update an existing Collection */
  updateCollection: Collection;
  /** Delete a Collection and all of its descendants */
  deleteCollection: DeletionResponse;
  /** Move a Collection to a different parent or index */
  moveCollection: Collection;
  /** Create a new Country */
  createCountry: Country;
  /** Update an existing Country */
  updateCountry: Country;
  /** Delete a Country */
  deleteCountry: DeletionResponse;
  /** Create a new CustomerGroup */
  createCustomerGroup: CustomerGroup;
  /** Update an existing CustomerGroup */
  updateCustomerGroup: CustomerGroup;
  /** Delete a CustomerGroup */
  deleteCustomerGroup: DeletionResponse;
  /** Add Customers to a CustomerGroup */
  addCustomersToGroup: CustomerGroup;
  /** Remove Customers from a CustomerGroup */
  removeCustomersFromGroup: CustomerGroup;
  /** Create a new Customer. If a password is provided, a new User will also be created an linked to the Customer. */
  createCustomer: CreateCustomerResult;
  /** Update an existing Customer */
  updateCustomer: UpdateCustomerResult;
  /** Delete a Customer */
  deleteCustomer: DeletionResponse;
  /** Create a new Address and associate it with the Customer specified by customerId */
  createCustomerAddress: Address;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /** Update an existing Address */
  deleteCustomerAddress: Success;
  addNoteToCustomer: Customer;
  updateCustomerNote: HistoryEntry;
  deleteCustomerNote: DeletionResponse;
  /** Create a new Facet */
  createFacet: Facet;
  /** Update an existing Facet */
  updateFacet: Facet;
  /** Delete an existing Facet */
  deleteFacet: DeletionResponse;
  /** Create one or more FacetValues */
  createFacetValues: Array<FacetValue>;
  /** Update one or more FacetValues */
  updateFacetValues: Array<FacetValue>;
  /** Delete one or more FacetValues */
  deleteFacetValues: Array<DeletionResponse>;
  updateGlobalSettings: UpdateGlobalSettingsResult;
  importProducts?: Maybe<ImportInfo>;
  /** Remove all settled jobs in the given queues olfer than the given date. Returns the number of jobs deleted. */
  removeSettledJobs: Scalars['Int'];
  settlePayment: SettlePaymentResult;
  addFulfillmentToOrder: AddFulfillmentToOrderResult;
  cancelOrder: CancelOrderResult;
  refundOrder: RefundOrderResult;
  settleRefund: SettleRefundResult;
  addNoteToOrder: Order;
  updateOrderNote: HistoryEntry;
  deleteOrderNote: DeletionResponse;
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  transitionFulfillmentToState: TransitionFulfillmentToStateResult;
  setOrderCustomFields?: Maybe<Order>;
  /** Update an existing PaymentMethod */
  updatePaymentMethod: PaymentMethod;
  /** Create a new ProductOptionGroup */
  createProductOptionGroup: ProductOptionGroup;
  /** Update an existing ProductOptionGroup */
  updateProductOptionGroup: ProductOptionGroup;
  /** Create a new ProductOption within a ProductOptionGroup */
  createProductOption: ProductOption;
  /** Create a new ProductOption within a ProductOptionGroup */
  updateProductOption: ProductOption;
  reindex: Job;
  /** Create a new Product */
  createProduct: Product;
  /** Update an existing Product */
  updateProduct: Product;
  /** Delete a Product */
  deleteProduct: DeletionResponse;
  /** Add an OptionGroup to a Product */
  addOptionGroupToProduct: Product;
  /** Remove an OptionGroup from a Product */
  removeOptionGroupFromProduct: RemoveOptionGroupFromProductResult;
  /** Create a set of ProductVariants based on the OptionGroups assigned to the given Product */
  createProductVariants: Array<Maybe<ProductVariant>>;
  /** Update existing ProductVariants */
  updateProductVariants: Array<Maybe<ProductVariant>>;
  /** Delete a ProductVariant */
  deleteProductVariant: DeletionResponse;
  /** Assigns Products to the specified Channel */
  assignProductsToChannel: Array<Product>;
  /** Removes Products from the specified Channel */
  removeProductsFromChannel: Array<Product>;
  createPromotion: CreatePromotionResult;
  updatePromotion: UpdatePromotionResult;
  deletePromotion: DeletionResponse;
  /** Create a new Role */
  createRole: Role;
  /** Update an existing Role */
  updateRole: Role;
  /** Delete an existing Role */
  deleteRole: DeletionResponse;
  /** Create a new ShippingMethod */
  createShippingMethod: ShippingMethod;
  /** Update an existing ShippingMethod */
  updateShippingMethod: ShippingMethod;
  /** Delete a ShippingMethod */
  deleteShippingMethod: DeletionResponse;
  /** Create a new TaxCategory */
  createTaxCategory: TaxCategory;
  /** Update an existing TaxCategory */
  updateTaxCategory: TaxCategory;
  /** Deletes a TaxCategory */
  deleteTaxCategory: DeletionResponse;
  /** Create a new TaxRate */
  createTaxRate: TaxRate;
  /** Update an existing TaxRate */
  updateTaxRate: TaxRate;
  /** Delete a TaxRate */
  deleteTaxRate: DeletionResponse;
  /** Create a new Zone */
  createZone: Zone;
  /** Update an existing Zone */
  updateZone: Zone;
  /** Delete a Zone */
  deleteZone: DeletionResponse;
  /** Add members to a Zone */
  addMembersToZone: Zone;
  /** Remove members from a Zone */
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
  createPincode: Pincode;
  updatePincode: Pincode;
  deletePincode: PincodeDeleteReturn;
  createShippingCountry: ShippingCountryPrice;
  updateShippingCountry: ShippingCountryPrice;
  deleteShippingCountry: DeletionResponse;
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
  updateDelhiveryAccount: DelhiveryAccount;
  createDelhiveryWarehouse: DelhiveryWarehouse;
  updateDelhiveryWarehouse: DelhiveryWarehouse;
  fulfillOrder: AddFulfillmentToOrderResult;
  updateEcomExpressConfig: EcomExpressAccount;
};


export type MutationCreateAdministratorArgs = {
  input: CreateAdministratorInput;
};


export type MutationUpdateAdministratorArgs = {
  input: UpdateAdministratorInput;
};


export type MutationUpdateActiveAdministratorArgs = {
  input: UpdateActiveAdministratorInput;
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


export type MutationAddFulfillmentToOrderArgs = {
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


export type MutationTransitionFulfillmentToStateArgs = {
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


export type MutationCreatePincodeArgs = {
  input: CreatePincodeInput;
};


export type MutationUpdatePincodeArgs = {
  input: UpdatePincodeInput;
};


export type MutationDeletePincodeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateShippingCountryArgs = {
  input: CreateShippingCountryInput;
};


export type MutationUpdateShippingCountryArgs = {
  input: UpdateShippingCountryInput;
};


export type MutationDeleteShippingCountryArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateDelhiveryAccountArgs = {
  input: UpdateDelhiveryAccountInput;
};


export type MutationCreateDelhiveryWarehouseArgs = {
  input: CreateDelhiveryWarehouseInput;
  countryName: Scalars['String'];
};


export type MutationUpdateDelhiveryWarehouseArgs = {
  input: UpdateDelhiveryWarehouseInput;
};


export type MutationFulfillOrderArgs = {
  input: FulfillOrderInput;
};


export type MutationUpdateEcomExpressConfigArgs = {
  input: EcomExpressInput;
};

export type CreateAdministratorInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  emailAddress: Scalars['String'];
  password: Scalars['String'];
  roleIds: Array<Scalars['ID']>;
};

export type UpdateAdministratorInput = {
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roleIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateActiveAdministratorInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type MimeTypeError = ErrorResult & {
  __typename?: 'MimeTypeError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  fileName: Scalars['String'];
  mimeType: Scalars['String'];
};

export type CreateAssetResult = Asset | MimeTypeError;

export type CreateAssetInput = {
  file: Scalars['Upload'];
};

export type CoordinateInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type UpdateAssetInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  focalPoint?: Maybe<CoordinateInput>;
};

export type NativeAuthenticationResult = CurrentUser | InvalidCredentialsError | NativeAuthStrategyError;

export type AuthenticationResult = CurrentUser | InvalidCredentialsError;

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

/** Returned if attempting to set a Channel's defaultLanguageCode to a language which is not enabled in GlobalSettings */
export type LanguageNotAvailableError = ErrorResult & {
  __typename?: 'LanguageNotAvailableError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  languageCode: Scalars['String'];
};

export type CreateChannelResult = Channel | LanguageNotAvailableError;

export type UpdateChannelResult = Channel | LanguageNotAvailableError;

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

export type MoveCollectionInput = {
  collectionId: Scalars['ID'];
  parentId: Scalars['ID'];
  index: Scalars['Int'];
};

export type CreateCollectionTranslationInput = {
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
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

export type CreateCollectionInput = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  parentId?: Maybe<Scalars['ID']>;
  filters: Array<ConfigurableOperationInput>;
  translations: Array<CreateCollectionTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
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

export type CountryTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
};

export type CreateCountryInput = {
  code: Scalars['String'];
  translations: Array<CountryTranslationInput>;
  enabled: Scalars['Boolean'];
};

export type UpdateCountryInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<CountryTranslationInput>>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type CustomerGroupList = PaginatedList & {
  __typename?: 'CustomerGroupList';
  items: Array<CustomerGroup>;
  totalItems: Scalars['Int'];
};

export type CreateCustomerGroupInput = {
  name: Scalars['String'];
  customerIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateCustomerGroupInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
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

export type UpdateCustomerInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type AddNoteToCustomerInput = {
  id: Scalars['ID'];
  note: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type UpdateCustomerNoteInput = {
  noteId: Scalars['ID'];
  note: Scalars['String'];
};

export type CreateCustomerResult = Customer | EmailAddressConflictError;

export type UpdateCustomerResult = Customer | EmailAddressConflictError;

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

export type FacetTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetInput = {
  code: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  translations: Array<FacetTranslationInput>;
  values?: Maybe<Array<CreateFacetValueWithFacetInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateFacetInput = {
  id: Scalars['ID'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<FacetTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FacetValueTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetValueWithFacetInput = {
  code: Scalars['String'];
  translations: Array<FacetValueTranslationInput>;
};

export type CreateFacetValueInput = {
  facetId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<FacetValueTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateFacetValueInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<FacetValueTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  nextStates: Array<Scalars['String']>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  orderItems: Array<OrderItem>;
  state: Scalars['String'];
  method: Scalars['String'];
  trackingCode?: Maybe<Scalars['String']>;
  customFields?: Maybe<FulfillmentCustomFields>;
};

export type UpdateGlobalSettingsInput = {
  availableLanguages?: Maybe<Array<LanguageCode>>;
  trackInventory?: Maybe<Scalars['Boolean']>;
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  customFields?: Maybe<UpdateGlobalSettingsCustomFieldsInput>;
};

/**
 * Returned when the default LanguageCode of a Channel is no longer found in the `availableLanguages`
 * of the GlobalSettings
 */
export type ChannelDefaultLanguageError = ErrorResult & {
  __typename?: 'ChannelDefaultLanguageError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  language: Scalars['String'];
  channelCode: Scalars['String'];
};

export type UpdateGlobalSettingsResult = GlobalSettings | ChannelDefaultLanguageError;

/**
 * @description
 * The state of a Job in the JobQueue
 *
 * @docsCategory common
 */
export enum JobState {
  Pending = 'PENDING',
  Running = 'RUNNING',
  Completed = 'COMPLETED',
  Retrying = 'RETRYING',
  Failed = 'FAILED'
}

export type JobList = PaginatedList & {
  __typename?: 'JobList';
  items: Array<Job>;
  totalItems: Scalars['Int'];
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

export type JobQueue = {
  __typename?: 'JobQueue';
  name: Scalars['String'];
  running: Scalars['Boolean'];
};

export type Order = Node & {
  __typename?: 'Order';
  nextStates: Array<Scalars['String']>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']>;
  /** A unique code for the Order */
  code: Scalars['String'];
  state: Scalars['String'];
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean'];
  customer?: Maybe<Customer>;
  shippingAddress?: Maybe<OrderAddress>;
  billingAddress?: Maybe<OrderAddress>;
  lines: Array<OrderLine>;
  /** Order-level adjustments to the order total, such as discounts from promotions */
  adjustments: Array<Adjustment>;
  couponCodes: Array<Scalars['String']>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  payments?: Maybe<Array<Payment>>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  totalQuantity: Scalars['Int'];
  subTotalBeforeTax: Scalars['Int'];
  /** The subTotal is the total of the OrderLines, before order-level promotions and shipping has been applied. */
  subTotal: Scalars['Int'];
  currencyCode: CurrencyCode;
  shipping: Scalars['Int'];
  shippingWithTax: Scalars['Int'];
  shippingMethod?: Maybe<ShippingMethod>;
  totalBeforeTax: Scalars['Int'];
  total: Scalars['Int'];
  taxSummary: Array<OrderTaxSummary>;
  history: HistoryEntryList;
  channels?: Maybe<Array<Maybe<Channel>>>;
  customFields?: Maybe<OrderCustomFields>;
};


export type OrderHistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>;
};

export type UpdateOrderInput = {
  id: Scalars['ID'];
  customFields?: Maybe<UpdateOrderCustomFieldsInput>;
};

export type FulfillOrderInput = {
  lines: Array<OrderLineInput>;
  method: Scalars['String'];
  trackingCode?: Maybe<Scalars['String']>;
  numberItem?: Maybe<Scalars['Int']>;
  orderWeight?: Maybe<Scalars['Int']>;
  packageAmount?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['ID']>;
  courier?: Maybe<Scalars['String']>;
};

export type CancelOrderInput = {
  /** The id of the order to be cancelled */
  orderId: Scalars['ID'];
  /** Optionally specify which OrderLines to cancel. If not provided, all OrderLines will be cancelled */
  lines?: Maybe<Array<OrderLineInput>>;
  reason?: Maybe<Scalars['String']>;
};

export type RefundOrderInput = {
  lines: Array<OrderLineInput>;
  shipping: Scalars['Int'];
  adjustment: Scalars['Int'];
  paymentId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
};

export type OrderLineInput = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type SettleRefundInput = {
  id: Scalars['ID'];
  transactionId: Scalars['String'];
};

export type AddNoteToOrderInput = {
  id: Scalars['ID'];
  note: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type UpdateOrderNoteInput = {
  noteId: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

/** Returned if the Payment settlement fails */
export type SettlePaymentError = ErrorResult & {
  __typename?: 'SettlePaymentError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Returned if no OrderLines have been specified for the operation */
export type EmptyOrderLineSelectionError = ErrorResult & {
  __typename?: 'EmptyOrderLineSelectionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the specified items are already part of a Fulfillment */
export type ItemsAlreadyFulfilledError = ErrorResult & {
  __typename?: 'ItemsAlreadyFulfilledError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if attempting to create a Fulfillment when there is insufficient
 * stockOnHand of a ProductVariant to satisfy the requested quantity.
 */
export type InsufficientStockOnHandError = ErrorResult & {
  __typename?: 'InsufficientStockOnHandError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  stockOnHand: Scalars['Int'];
};

/** Returned if an operation has specified OrderLines from multiple Orders */
export type MultipleOrderError = ErrorResult & {
  __typename?: 'MultipleOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if an attempting to cancel lines from an Order which is still active */
export type CancelActiveOrderError = ErrorResult & {
  __typename?: 'CancelActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  orderState: Scalars['String'];
};

/** Returned if an attempting to refund a Payment against OrderLines from a different Order */
export type PaymentOrderMismatchError = ErrorResult & {
  __typename?: 'PaymentOrderMismatchError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if an attempting to refund an Order which is not in the expected state */
export type RefundOrderStateError = ErrorResult & {
  __typename?: 'RefundOrderStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  orderState: Scalars['String'];
};

/** Returned if an attempting to refund an Order but neither items nor shipping refund was specified */
export type NothingToRefundError = ErrorResult & {
  __typename?: 'NothingToRefundError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if an attempting to refund an OrderItem which has already been refunded */
export type AlreadyRefundedError = ErrorResult & {
  __typename?: 'AlreadyRefundedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  refundId: Scalars['ID'];
};

/** Returned if the specified quantity of an OrderLine is greater than the number of items in that line */
export type QuantityTooGreatError = ErrorResult & {
  __typename?: 'QuantityTooGreatError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when there is an error in transitioning the Refund state */
export type RefundStateTransitionError = ErrorResult & {
  __typename?: 'RefundStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

/** Returned when there is an error in transitioning the Payment state */
export type PaymentStateTransitionError = ErrorResult & {
  __typename?: 'PaymentStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

/** Returned when there is an error in transitioning the Fulfillment state */
export type FulfillmentStateTransitionError = ErrorResult & {
  __typename?: 'FulfillmentStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type SettlePaymentResult = Payment | SettlePaymentError | PaymentStateTransitionError | OrderStateTransitionError;

export type AddFulfillmentToOrderResult = Fulfillment | EmptyOrderLineSelectionError | ItemsAlreadyFulfilledError | InsufficientStockOnHandError;

export type CancelOrderResult = Order | EmptyOrderLineSelectionError | QuantityTooGreatError | MultipleOrderError | CancelActiveOrderError | OrderStateTransitionError;

export type RefundOrderResult = Refund | QuantityTooGreatError | NothingToRefundError | OrderStateTransitionError | MultipleOrderError | PaymentOrderMismatchError | RefundOrderStateError | AlreadyRefundedError | RefundStateTransitionError;

export type SettleRefundResult = Refund | RefundStateTransitionError;

export type TransitionFulfillmentToStateResult = Fulfillment | FulfillmentStateTransitionError;

export type PaymentMethodList = PaginatedList & {
  __typename?: 'PaymentMethodList';
  items: Array<PaymentMethod>;
  totalItems: Scalars['Int'];
};

export type UpdatePaymentMethodInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  configArgs?: Maybe<Array<ConfigArgInput>>;
};

export type ProductOptionGroupTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductOptionGroupInput = {
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
  options: Array<CreateGroupOptionInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductOptionGroupInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<ProductOptionGroupTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateGroupOptionInput = {
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
};

export type CreateProductOptionInput = {
  productOptionGroupId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductOptionInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<ProductOptionGroupTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  enabled: Scalars['Boolean'];
  /** An array of ids of the Collections in which this result appears */
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
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>;
  /** A relevence score for the result. Differs between database implementations */
  score: Scalars['Float'];
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

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  enabled: Scalars['Boolean'];
  trackInventory: GlobalFlag;
  stockOnHand: Scalars['Int'];
  stockAllocated: Scalars['Int'];
  outOfStockThreshold: Scalars['Int'];
  useGlobalOutOfStockThreshold: Scalars['Boolean'];
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

export type StockMovementListOptions = {
  type?: Maybe<StockMovementType>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type ProductTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductInput = {
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  translations: Array<ProductTranslationInput>;
  customFields?: Maybe<CreateProductCustomFieldsInput>;
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

export type ProductVariantTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductVariantOptionInput = {
  optionGroupId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<ProductOptionTranslationInput>;
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
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
  trackInventory?: Maybe<GlobalFlag>;
  customFields?: Maybe<CreateProductVariantCustomFieldsInput>;
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
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
  trackInventory?: Maybe<GlobalFlag>;
  customFields?: Maybe<UpdateProductVariantCustomFieldsInput>;
};

export type AssignProductsToChannelInput = {
  productIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
  priceFactor?: Maybe<Scalars['Float']>;
};

export type RemoveProductsFromChannelInput = {
  productIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type ProductOptionInUseError = ErrorResult & {
  __typename?: 'ProductOptionInUseError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  optionGroupCode: Scalars['String'];
  productVariantCount: Scalars['Int'];
};

export type RemoveOptionGroupFromProductResult = Product | ProductOptionInUseError;

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

/** Returned if a PromotionCondition has neither a couponCode nor any conditions set */
export type MissingConditionsError = ErrorResult & {
  __typename?: 'MissingConditionsError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type CreatePromotionResult = Promotion | MissingConditionsError;

export type UpdatePromotionResult = Promotion | MissingConditionsError;

export type CreateRoleInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateRoleInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
};

export type ShippingMethodTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateShippingMethodInput = {
  code: Scalars['String'];
  checker: ConfigurableOperationInput;
  calculator: ConfigurableOperationInput;
  translations: Array<ShippingMethodTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateShippingMethodInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  checker?: Maybe<ConfigurableOperationInput>;
  calculator?: Maybe<ConfigurableOperationInput>;
  translations: Array<ShippingMethodTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type TestShippingMethodInput = {
  checker: ConfigurableOperationInput;
  calculator: ConfigurableOperationInput;
  shippingAddress: CreateAddressInput;
  lines: Array<TestShippingMethodOrderLineInput>;
};

export type TestEligibleShippingMethodsInput = {
  shippingAddress: CreateAddressInput;
  lines: Array<TestShippingMethodOrderLineInput>;
};

export type TestShippingMethodOrderLineInput = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type TestShippingMethodResult = {
  __typename?: 'TestShippingMethodResult';
  eligible: Scalars['Boolean'];
  quote?: Maybe<TestShippingMethodQuote>;
};

export type TestShippingMethodQuote = {
  __typename?: 'TestShippingMethodQuote';
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type CreateTaxCategoryInput = {
  name: Scalars['String'];
};

export type UpdateTaxCategoryInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type CreateTaxRateInput = {
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  value: Scalars['Float'];
  categoryId: Scalars['ID'];
  zoneId: Scalars['ID'];
  customerGroupId?: Maybe<Scalars['ID']>;
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

export type CreateZoneInput = {
  name: Scalars['String'];
  memberIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateZoneInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};




export enum GlobalFlag {
  True = 'TRUE',
  False = 'FALSE',
  Inherit = 'INHERIT'
}

export enum AdjustmentType {
  Tax = 'TAX',
  Promotion = 'PROMOTION',
  Shipping = 'SHIPPING',
  Refund = 'REFUND',
  TaxRefund = 'TAX_REFUND',
  PromotionRefund = 'PROMOTION_REFUND',
  ShippingRefund = 'SHIPPING_REFUND'
}

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String'];
  type: AdjustmentType;
  description: Scalars['String'];
  amount: Scalars['Int'];
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

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED'
}

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to create Catalog */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to read Catalog */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to update Catalog */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to delete Catalog */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to create Settings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to read Settings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to update Settings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to delete Settings */
  DeleteSettings = 'DeleteSettings'
}

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  result: DeletionResult;
  message?: Maybe<Scalars['String']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigurableOperationInput = {
  code: Scalars['String'];
  arguments: Array<ConfigArgInput>;
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

export type Node = {
  id: Scalars['ID'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum ErrorCode {
  UnknownError = 'UNKNOWN_ERROR',
  MimeTypeError = 'MIME_TYPE_ERROR',
  LanguageNotAvailableError = 'LANGUAGE_NOT_AVAILABLE_ERROR',
  ChannelDefaultLanguageError = 'CHANNEL_DEFAULT_LANGUAGE_ERROR',
  SettlePaymentError = 'SETTLE_PAYMENT_ERROR',
  EmptyOrderLineSelectionError = 'EMPTY_ORDER_LINE_SELECTION_ERROR',
  ItemsAlreadyFulfilledError = 'ITEMS_ALREADY_FULFILLED_ERROR',
  InsufficientStockOnHandError = 'INSUFFICIENT_STOCK_ON_HAND_ERROR',
  MultipleOrderError = 'MULTIPLE_ORDER_ERROR',
  CancelActiveOrderError = 'CANCEL_ACTIVE_ORDER_ERROR',
  PaymentOrderMismatchError = 'PAYMENT_ORDER_MISMATCH_ERROR',
  RefundOrderStateError = 'REFUND_ORDER_STATE_ERROR',
  NothingToRefundError = 'NOTHING_TO_REFUND_ERROR',
  AlreadyRefundedError = 'ALREADY_REFUNDED_ERROR',
  QuantityTooGreatError = 'QUANTITY_TOO_GREAT_ERROR',
  RefundStateTransitionError = 'REFUND_STATE_TRANSITION_ERROR',
  PaymentStateTransitionError = 'PAYMENT_STATE_TRANSITION_ERROR',
  FulfillmentStateTransitionError = 'FULFILLMENT_STATE_TRANSITION_ERROR',
  ProductOptionInUseError = 'PRODUCT_OPTION_IN_USE_ERROR',
  MissingConditionsError = 'MISSING_CONDITIONS_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type StringOperators = {
  eq?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  regex?: Maybe<Scalars['String']>;
};

export type BooleanOperators = {
  eq?: Maybe<Scalars['Boolean']>;
};

export type NumberRange = {
  start: Scalars['Float'];
  end: Scalars['Float'];
};

export type NumberOperators = {
  eq?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  between?: Maybe<NumberRange>;
};

export type DateRange = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
};

export type DateOperators = {
  eq?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
  after?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateRange>;
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

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

export type SearchResultSortParameter = {
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
};

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
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

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

/** Retured when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  authenticationError: Scalars['String'];
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

/** Retured when attemting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
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

export type CustomField = {
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
};

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

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
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

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export type CustomFieldConfig = StringCustomFieldConfig | LocaleStringCustomFieldConfig | IntCustomFieldConfig | FloatCustomFieldConfig | BooleanCustomFieldConfig | DateTimeCustomFieldConfig;

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
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

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
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

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
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

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
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

export type CountryTranslation = {
  __typename?: 'CountryTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
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

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type GlobalSettings = {
  __typename?: 'GlobalSettings';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  availableLanguages: Array<LanguageCode>;
  trackInventory: Scalars['Boolean'];
  outOfStockThreshold: Scalars['Int'];
  serverConfig: ServerConfig;
  customFields?: Maybe<GlobalSettingsCustomFields>;
};

export type OrderProcessState = {
  __typename?: 'OrderProcessState';
  name: Scalars['String'];
  to: Array<Scalars['String']>;
};

export type PermissionDefinition = {
  __typename?: 'PermissionDefinition';
  name: Scalars['String'];
  description: Scalars['String'];
  assignable: Scalars['Boolean'];
};

export type ServerConfig = {
  __typename?: 'ServerConfig';
  orderProcess: Array<OrderProcessState>;
  permittedAssetTypes: Array<Scalars['String']>;
  permissions: Array<PermissionDefinition>;
  customFieldConfig: CustomFields;
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
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderNote = 'ORDER_NOTE',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED'
}

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int'];
};

export type ImportInfo = {
  __typename?: 'ImportInfo';
  errors?: Maybe<Array<Scalars['String']>>;
  processed: Scalars['Int'];
  imported: Scalars['Int'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** The taxRate as a percentage */
  taxRate: Scalars['Float'];
  /** The total net price or OrderItems to which this taxRate applies */
  taxBase: Scalars['Int'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Int'];
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

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  id: Scalars['ID'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type OrderItem = Node & {
  __typename?: 'OrderItem';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  cancelled: Scalars['Boolean'];
  /** The price of a single unit, excluding tax */
  unitPrice: Scalars['Int'];
  /** The price of a single unit, including tax */
  unitPriceWithTax: Scalars['Int'];
  /** @deprecated `unitPrice` is now always without tax */
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
  /** @deprecated Use `linePriceWithTax` instead */
  totalPrice: Scalars['Int'];
  taxRate: Scalars['Float'];
  /** The total price of the line excluding tax */
  linePrice: Scalars['Int'];
  /** The total tax on this line */
  lineTax: Scalars['Int'];
  /** The total price of the line including tax */
  linePriceWithTax: Scalars['Int'];
  adjustments: Array<Adjustment>;
  order: Order;
  customFields?: Maybe<Scalars['JSON']>;
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

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
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

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  facetValue: FacetValue;
  count: Scalars['Int'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  id: Scalars['ID'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Int'];
};

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  min: Scalars['Int'];
  max: Scalars['Int'];
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

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
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

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  checker: ConfigurableOperation;
  calculator: ConfigurableOperation;
  translations: Array<ShippingMethodTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  description: Scalars['String'];
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export enum StockMovementType {
  Adjustment = 'ADJUSTMENT',
  Allocation = 'ALLOCATION',
  Release = 'RELEASE',
  Sale = 'SALE',
  Cancellation = 'CANCELLATION',
  Return = 'RETURN'
}

export type StockMovement = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
};

export type StockAdjustment = Node & StockMovement & {
  __typename?: 'StockAdjustment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
};

export type Allocation = Node & StockMovement & {
  __typename?: 'Allocation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderLine: OrderLine;
};

export type Sale = Node & StockMovement & {
  __typename?: 'Sale';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderItem: OrderItem;
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

export type Release = Node & StockMovement & {
  __typename?: 'Release';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderItem: OrderItem;
};

export type StockMovementItem = StockAdjustment | Allocation | Sale | Cancellation | Return | Release;

export type StockMovementList = {
  __typename?: 'StockMovementList';
  items: Array<StockMovementItem>;
  totalItems: Scalars['Int'];
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

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  strategy: Scalars['String'];
};

export type Zone = Node & {
  __typename?: 'Zone';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  members: Array<Country>;
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

export type ProductReviewList = PaginatedList & {
  __typename?: 'ProductReviewList';
  items: Array<ProductReview>;
  totalItems: Scalars['Int'];
};

export type ProductReviewHistogramItem = {
  __typename?: 'ProductReviewHistogramItem';
  bin: Scalars['Int'];
  frequency: Scalars['Int'];
};

export type UpdateProductReviewInput = {
  id: Scalars['ID'];
  summary?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  response?: Maybe<Scalars['String']>;
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
  sort?: Maybe<ContactSortParameter>;
  filter?: Maybe<ContactFilterParameter>;
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
  sort?: Maybe<SubscriberSortParameter>;
  filter?: Maybe<SubscriberFilterParameter>;
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

export type NewsletterDeleteReturn = {
  __typename?: 'NewsletterDeleteReturn';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
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

export type SendNewsletterInput = {
  email: Scalars['String'];
  newsletterId: Scalars['ID'];
};

export type AddNewsletterInput = {
  newsletterId: Scalars['ID'];
  startAt: Scalars['DateTime'];
  subject: Scalars['String'];
  templateContent: Scalars['String'];
  templateCss: Scalars['String'];
};

export type SendNewsletterQueueInput = {
  queueId: Scalars['ID'];
};

export type DeleteNewsletterQueueInput = {
  queueId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['String']>;
  finishAt?: Maybe<Scalars['String']>;
};

export enum RecommendationType {
  Crosssell = 'CROSSSELL',
  Upsell = 'UPSELL',
  Related = 'RELATED'
}

export type ProductRecommendation = {
  __typename?: 'ProductRecommendation';
  product: Product;
  recommendation: Product;
  type: RecommendationType;
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

export type Pincode = Node & {
  __typename?: 'Pincode';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  pincode?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  prepaid?: Maybe<Scalars['Boolean']>;
  cod?: Maybe<Scalars['Boolean']>;
  pickup?: Maybe<Scalars['Boolean']>;
  cash?: Maybe<Scalars['Boolean']>;
  repl?: Maybe<Scalars['Boolean']>;
};

export type PincodeList = PaginatedList & {
  __typename?: 'PincodeList';
  items: Array<Pincode>;
  totalItems: Scalars['Int'];
};

export type PincodeDeleteReturn = {
  __typename?: 'PincodeDeleteReturn';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type PincodeListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  sort?: Maybe<PincodeSortParameter>;
  filter?: Maybe<PincodeFilterParameter>;
};

export type CheckPincodeInput = {
  pincode: Scalars['String'];
  productWeight?: Maybe<Scalars['Int']>;
};

export type UpdatePincodeInput = {
  id: Scalars['ID'];
  pincode?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  prepaid?: Maybe<Scalars['Boolean']>;
  cod?: Maybe<Scalars['Boolean']>;
  pickup?: Maybe<Scalars['Boolean']>;
  cash?: Maybe<Scalars['Boolean']>;
  repl?: Maybe<Scalars['Boolean']>;
};

export type CreatePincodeInput = {
  pincode?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  prepaid?: Maybe<Scalars['Boolean']>;
  cod?: Maybe<Scalars['Boolean']>;
  pickup?: Maybe<Scalars['Boolean']>;
  cash?: Maybe<Scalars['Boolean']>;
  repl?: Maybe<Scalars['Boolean']>;
};

export type ShippingCountryPrice = Node & {
  __typename?: 'ShippingCountryPrice';
  id: Scalars['ID'];
  country_code: Scalars['String'];
  country_name: Scalars['String'];
  price: Scalars['Float'];
};

export type ShippingCountryPriceList = PaginatedList & {
  __typename?: 'ShippingCountryPriceList';
  items: Array<ShippingCountryPrice>;
  totalItems: Scalars['Int'];
};

export type CreateShippingCountryInput = {
  country_code: Scalars['String'];
  price: Scalars['Float'];
};

export type UpdateShippingCountryInput = {
  id: Scalars['ID'];
  price: Scalars['Float'];
};

export type FacetResult = {
  __typename?: 'FacetResult';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  facetValues: Array<FacetValueResult>;
};

export type OrderVendorPaymentInput = {
  method: Scalars['String'];
  metadata: Scalars['JSON'];
};

export enum VendorAccountType {
  Current = 'CURRENT',
  Saving = 'SAVING'
}

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
};

export type VendorInfoInput = {
  vendorId: Scalars['String'];
  brandName: Scalars['String'];
  regAddress: Scalars['String'];
  postalCode: Scalars['String'];
  city: Scalars['String'];
  countryCode: Scalars['String'];
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

export type VendorBankInput = {
  vendorId: Scalars['String'];
  account: Scalars['String'];
  code: Scalars['String'];
  address: Scalars['String'];
  type: VendorAccountType;
  isCheck?: Maybe<Scalars['String']>;
};

export type VendorContactInput = {
  vendorId: Scalars['String'];
  contactName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
};

export type VendorMarketingContactInput = {
  vendorId: Scalars['String'];
  name: Scalars['String'];
  emailAddress: Scalars['String'];
  phone: Scalars['String'];
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

export type UpdateVendorInfoInput = {
  id: Scalars['ID'];
  brandName: Scalars['String'];
  regAddress: Scalars['String'];
  postalCode: Scalars['String'];
  city: Scalars['String'];
  countryCode: Scalars['String'];
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
  email: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateVendorMarketingInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  emailAddress: Scalars['String'];
  phone: Scalars['String'];
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

export type VendorBank = Node & {
  __typename?: 'VendorBank';
  id: Scalars['ID'];
  account?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  type?: Maybe<VendorAccountType>;
  isCheck?: Maybe<Scalars['String']>;
};

export type VendorContact = Node & {
  __typename?: 'VendorContact';
  id: Scalars['ID'];
  contactName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type VendorInfo = Node & {
  __typename?: 'VendorInfo';
  id: Scalars['ID'];
  brandName: Scalars['String'];
  regAddress: Scalars['String'];
  postalCode: Scalars['String'];
  city: Scalars['String'];
  countryCode: Scalars['String'];
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

export type VendorMarketingContact = Node & {
  __typename?: 'VendorMarketingContact';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type VendorList = PaginatedList & {
  __typename?: 'VendorList';
  items: Array<Vendor>;
  totalItems: Scalars['Int'];
};

export enum VerifyResult {
  Success = 'SUCCESS',
  Fail = 'FAIL'
}

export type VerifyResponse = {
  __typename?: 'VerifyResponse';
  result: VerifyResult;
  brand?: Maybe<Scalars['String']>;
};


export type DailyOrderInput = {
  month?: Maybe<Scalars['String']>;
  year: Scalars['String'];
  state: Scalars['String'];
};

export type OrdersPerMonth = {
  __typename?: 'OrdersPerMonth';
  month: Scalars['String'];
  totalOrders: Scalars['Int'];
  day?: Maybe<Scalars['String']>;
};

export type DailyOrderOutput = {
  __typename?: 'DailyOrderOutput';
  items: Array<OrdersPerMonth>;
};

export type DailyOrderList = PaginatedList & {
  __typename?: 'DailyOrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export enum DelhiveryShippingMode {
  Express = 'Express',
  Surface = 'Surface'
}

export type DelhiveryAccount = Node & {
  __typename?: 'DelhiveryAccount';
  id: Scalars['ID'];
  client_name: Scalars['String'];
  user_name: Scalars['String'];
  api_key: Scalars['String'];
  shipping_mode: DelhiveryShippingMode;
  hand_fee: Scalars['Int'];
};

export type DelhiveryWarehouse = Node & {
  __typename?: 'DelhiveryWarehouse';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  pickup_name: Scalars['String'];
  city: Scalars['String'];
  pincode: Scalars['String'];
  state: Scalars['String'];
  address: Scalars['String'];
  country: Scalars['String'];
  contact_person_email: Scalars['String'];
  contact_person_name: Scalars['String'];
  contact_person_phone: Scalars['String'];
  return_address: Scalars['String'];
  return_pincode: Scalars['String'];
  return_city: Scalars['String'];
  return_state: Scalars['String'];
  return_country: Scalars['String'];
  from_working_hours: Scalars['String'];
  to_working_hours: Scalars['String'];
  day_working_hours: Scalars['String'];
  preferred_pickup_slots: Scalars['String'];
  channelId: Scalars['String'];
};

export type DelhiveryWarehouseList = PaginatedList & {
  __typename?: 'DelhiveryWarehouseList';
  items: Array<DelhiveryWarehouse>;
  totalItems: Scalars['Int'];
};

export type UpdateDelhiveryAccountInput = {
  id?: Maybe<Scalars['ID']>;
  client_name: Scalars['String'];
  user_name: Scalars['String'];
  api_key: Scalars['String'];
  shipping_mode: DelhiveryShippingMode;
  hand_fee: Scalars['Int'];
};

export type CreateDelhiveryWarehouseInput = {
  pickup_name: Scalars['String'];
  city: Scalars['String'];
  pincode: Scalars['String'];
  state: Scalars['String'];
  address: Scalars['String'];
  country: Scalars['String'];
  contact_person_email: Scalars['String'];
  contact_person_name: Scalars['String'];
  contact_person_phone: Scalars['String'];
  return_address: Scalars['String'];
  return_pincode: Scalars['String'];
  return_city: Scalars['String'];
  return_state: Scalars['String'];
  return_country: Scalars['String'];
  from_working_hours: Scalars['String'];
  to_working_hours: Scalars['String'];
  day_working_hours: Scalars['String'];
  preferred_pickup_slots: Scalars['String'];
  channelId: Scalars['String'];
};

export type UpdateDelhiveryWarehouseInput = {
  id: Scalars['ID'];
  pickup_name: Scalars['String'];
  city: Scalars['String'];
  pincode: Scalars['String'];
  state: Scalars['String'];
  address: Scalars['String'];
  country: Scalars['String'];
  contact_person_email: Scalars['String'];
  contact_person_name: Scalars['String'];
  contact_person_phone: Scalars['String'];
  return_address: Scalars['String'];
  return_pincode: Scalars['String'];
  return_city: Scalars['String'];
  return_state: Scalars['String'];
  return_country: Scalars['String'];
  from_working_hours: Scalars['String'];
  to_working_hours: Scalars['String'];
  day_working_hours: Scalars['String'];
  preferred_pickup_slots: Scalars['String'];
  channelId: Scalars['String'];
};

export type DelhiveryWarehouseListOptions = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  sort?: Maybe<DelhiveryWarehouseSortParameter>;
  filter?: Maybe<DelhiveryWarehouseFilterParameter>;
};

export type DelhiveryWarehouseByChannelId = {
  channelId: Scalars['String'];
};

export type DelhiveryWarehouseByPickupName = {
  pickup_name: Scalars['String'];
};

export type PackingSlip = {
  __typename?: 'PackingSlip';
  origin?: Maybe<Scalars['String']>;
  invoice_reference?: Maybe<Scalars['String']>;
  shipment_width?: Maybe<Scalars['Int']>;
  pin?: Maybe<Scalars['Int']>;
  cl?: Maybe<Scalars['String']>;
  intl?: Maybe<Scalars['String']>;
  origin_state_code?: Maybe<Scalars['String']>;
  cd?: Maybe<Scalars['String']>;
  ewbn?: Maybe<Array<Scalars['String']>>;
  rph?: Maybe<Scalars['String']>;
  shipment_length?: Maybe<Scalars['Int']>;
  snm?: Maybe<Scalars['String']>;
  barcode?: Maybe<Scalars['String']>;
  origin_city?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
  pt?: Maybe<Scalars['String']>;
  rs?: Maybe<Scalars['Int']>;
  destination?: Maybe<Scalars['String']>;
  si?: Maybe<Scalars['String']>;
  destination_city?: Maybe<Scalars['String']>;
  hsn_code?: Maybe<Scalars['String']>;
  tin?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
  origin_state?: Maybe<Scalars['String']>;
  oid_barcode?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
  cst?: Maybe<Scalars['String']>;
  prd?: Maybe<Scalars['String']>;
  rcty?: Maybe<Scalars['String']>;
  consignee_gst_tin?: Maybe<Scalars['String']>;
  cnph?: Maybe<Scalars['String']>;
  sadd?: Maybe<Scalars['String']>;
  oid?: Maybe<Scalars['String']>;
  customer_state?: Maybe<Scalars['String']>;
  mot?: Maybe<Scalars['String']>;
  radd?: Maybe<Scalars['String']>;
  customer_state_code?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  rst?: Maybe<Scalars['String']>;
  seller_gst_tin?: Maybe<Scalars['String']>;
  shipment_height?: Maybe<Scalars['Int']>;
  pdd?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  st_code?: Maybe<Scalars['String']>;
  cl_logo?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  client_gst_tin?: Maybe<Scalars['String']>;
  etc?: Maybe<Scalars['String']>;
  delhivery_logo?: Maybe<Scalars['String']>;
  client_type?: Maybe<Scalars['String']>;
  cod?: Maybe<Scalars['Int']>;
  wbn?: Maybe<Scalars['String']>;
  sort_code?: Maybe<Scalars['String']>;
  rpin?: Maybe<Scalars['Int']>;
};

export type OrderFilterCondition = {
  createdAt?: Maybe<NumberRange>;
};

export type EcomExpressAccount = Node & {
  __typename?: 'EcomExpressAccount';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  production?: Maybe<Scalars['Boolean']>;
};

export type EcomExpressInput = {
  id?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
  password: Scalars['String'];
  production: Scalars['Boolean'];
};

export type AdministratorListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<AdministratorSortParameter>;
  filter?: Maybe<AdministratorFilterParameter>;
};

export type AssetListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<AssetSortParameter>;
  filter?: Maybe<AssetFilterParameter>;
};

export type CollectionListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CollectionSortParameter>;
  filter?: Maybe<CollectionFilterParameter>;
};

export type CountryListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CountrySortParameter>;
  filter?: Maybe<CountryFilterParameter>;
};

export type CustomerGroupListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CustomerGroupSortParameter>;
  filter?: Maybe<CustomerGroupFilterParameter>;
};

export type CustomerListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<CustomerSortParameter>;
  filter?: Maybe<CustomerFilterParameter>;
};

export type FacetListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<FacetSortParameter>;
  filter?: Maybe<FacetFilterParameter>;
};

export type JobListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<JobSortParameter>;
  filter?: Maybe<JobFilterParameter>;
};

export type OrderListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<OrderSortParameter>;
  filter?: Maybe<OrderFilterParameter>;
};

export type PaymentMethodListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<PaymentMethodSortParameter>;
  filter?: Maybe<PaymentMethodFilterParameter>;
};

export type ProductListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductSortParameter>;
  filter?: Maybe<ProductFilterParameter>;
};

export type PromotionListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<PromotionSortParameter>;
  filter?: Maybe<PromotionFilterParameter>;
};

export type RoleListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<RoleSortParameter>;
  filter?: Maybe<RoleFilterParameter>;
};

export type ShippingMethodListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ShippingMethodSortParameter>;
  filter?: Maybe<ShippingMethodFilterParameter>;
};

export type TaxRateListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<TaxRateSortParameter>;
  filter?: Maybe<TaxRateFilterParameter>;
};

export type ProductReviewListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductReviewSortParameter>;
  filter?: Maybe<ProductReviewFilterParameter>;
};

export type ShippingCountryPriceListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ShippingCountryPriceSortParameter>;
  filter?: Maybe<ShippingCountryPriceFilterParameter>;
};

export type ShippingCountryPriceSortParameter = {
  id?: Maybe<SortOrder>;
  country_code?: Maybe<SortOrder>;
  country_name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
};

export type ShippingCountryPriceFilterParameter = {
  country_code?: Maybe<StringOperators>;
  country_name?: Maybe<StringOperators>;
  price?: Maybe<NumberOperators>;
};

export type VendorListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<VendorSortParameter>;
  filter?: Maybe<VendorFilterParameter>;
};

export type ProductVariantListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductVariantSortParameter>;
  filter?: Maybe<ProductVariantFilterParameter>;
};

export type HistoryEntryListOptions = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sort?: Maybe<HistoryEntrySortParameter>;
  filter?: Maybe<HistoryEntryFilterParameter>;
};

export type AdministratorFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
};

export type AdministratorSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
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

export type CollectionSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  position?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type CountryFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type CountrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type CustomerGroupFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
};

export type CustomerGroupSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
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

export type FacetFilterParameter = {
  isPrivate?: Maybe<BooleanOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
};

export type FacetSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
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

export type JobSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  startedAt?: Maybe<SortOrder>;
  settledAt?: Maybe<SortOrder>;
  queueName?: Maybe<SortOrder>;
  progress?: Maybe<SortOrder>;
  duration?: Maybe<SortOrder>;
};

export type OrderFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  orderPlacedAt?: Maybe<DateOperators>;
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
  session?: Maybe<StringOperators>;
};

export type OrderSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  orderPlacedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  totalQuantity?: Maybe<SortOrder>;
  subTotalBeforeTax?: Maybe<SortOrder>;
  subTotal?: Maybe<SortOrder>;
  shipping?: Maybe<SortOrder>;
  shippingWithTax?: Maybe<SortOrder>;
  totalBeforeTax?: Maybe<SortOrder>;
  total?: Maybe<SortOrder>;
  session?: Maybe<SortOrder>;
};

export type PaymentMethodFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type PaymentMethodSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
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

export type RoleFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
};

export type RoleSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type ShippingMethodFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
};

export type ShippingMethodSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type TaxRateFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
  value?: Maybe<NumberOperators>;
};

export type TaxRateSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  value?: Maybe<SortOrder>;
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

export type PincodeFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  pincode?: Maybe<NumberOperators>;
  state?: Maybe<StringOperators>;
  district?: Maybe<StringOperators>;
  prepaid?: Maybe<BooleanOperators>;
  cod?: Maybe<BooleanOperators>;
  pickup?: Maybe<BooleanOperators>;
  cash?: Maybe<BooleanOperators>;
  repl?: Maybe<BooleanOperators>;
};

export type PincodeSortParameter = {
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  pincode?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  district?: Maybe<SortOrder>;
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

export type DelhiveryWarehouseFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  pickup_name?: Maybe<StringOperators>;
  city?: Maybe<StringOperators>;
  pincode?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  address?: Maybe<StringOperators>;
  country?: Maybe<StringOperators>;
  contact_person_email?: Maybe<StringOperators>;
  contact_person_name?: Maybe<StringOperators>;
  contact_person_phone?: Maybe<StringOperators>;
  return_address?: Maybe<StringOperators>;
  return_pincode?: Maybe<StringOperators>;
  return_city?: Maybe<StringOperators>;
  return_state?: Maybe<StringOperators>;
  return_country?: Maybe<StringOperators>;
  from_working_hours?: Maybe<StringOperators>;
  to_working_hours?: Maybe<StringOperators>;
  day_working_hours?: Maybe<StringOperators>;
  preferred_pickup_slots?: Maybe<StringOperators>;
  channelId?: Maybe<StringOperators>;
};

export type DelhiveryWarehouseSortParameter = {
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  pickup_name?: Maybe<SortOrder>;
  city?: Maybe<SortOrder>;
  pincode?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  address?: Maybe<SortOrder>;
  country?: Maybe<SortOrder>;
  contact_person_email?: Maybe<SortOrder>;
  contact_person_name?: Maybe<SortOrder>;
  contact_person_phone?: Maybe<SortOrder>;
  return_address?: Maybe<SortOrder>;
  return_pincode?: Maybe<SortOrder>;
  return_city?: Maybe<SortOrder>;
  return_state?: Maybe<SortOrder>;
  return_country?: Maybe<SortOrder>;
  from_working_hours?: Maybe<SortOrder>;
  to_working_hours?: Maybe<SortOrder>;
  day_working_hours?: Maybe<SortOrder>;
  preferred_pickup_slots?: Maybe<SortOrder>;
  channelId?: Maybe<SortOrder>;
};

export type ProductVariantFilterParameter = {
  enabled?: Maybe<BooleanOperators>;
  trackInventory?: Maybe<StringOperators>;
  stockOnHand?: Maybe<NumberOperators>;
  stockAllocated?: Maybe<NumberOperators>;
  outOfStockThreshold?: Maybe<NumberOperators>;
  useGlobalOutOfStockThreshold?: Maybe<BooleanOperators>;
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
  weight?: Maybe<NumberOperators>;
  length?: Maybe<NumberOperators>;
  height?: Maybe<NumberOperators>;
  width?: Maybe<NumberOperators>;
  shippingPrice?: Maybe<NumberOperators>;
  shippingBusinessPrice?: Maybe<NumberOperators>;
};

export type ProductVariantSortParameter = {
  stockOnHand?: Maybe<SortOrder>;
  stockAllocated?: Maybe<SortOrder>;
  outOfStockThreshold?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  sku?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  priceWithTax?: Maybe<SortOrder>;
  tierPriceEnabled?: Maybe<SortOrder>;
  weight?: Maybe<SortOrder>;
  length?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
  shippingPrice?: Maybe<SortOrder>;
  shippingBusinessPrice?: Maybe<SortOrder>;
};

export type HistoryEntryFilterParameter = {
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  isPublic?: Maybe<BooleanOperators>;
  type?: Maybe<StringOperators>;
};

export type HistoryEntrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type FulfillmentCustomFields = {
  __typename?: 'FulfillmentCustomFields';
  courier?: Maybe<Scalars['String']>;
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

export type OrderCustomFields = {
  __typename?: 'OrderCustomFields';
  session?: Maybe<Scalars['String']>;
};

export type UpdateOrderCustomFieldsInput = {
  session?: Maybe<Scalars['String']>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  reviewRating?: Maybe<Scalars['Float']>;
  reviewCount?: Maybe<Scalars['Float']>;
  productRecommendationsEnabled?: Maybe<Scalars['Boolean']>;
  isInStock?: Maybe<Scalars['Boolean']>;
};

export type CreateProductCustomFieldsInput = {
  reviewRating?: Maybe<Scalars['Float']>;
  reviewCount?: Maybe<Scalars['Float']>;
  productRecommendationsEnabled?: Maybe<Scalars['Boolean']>;
  isInStock?: Maybe<Scalars['Boolean']>;
};

export type UpdateProductCustomFieldsInput = {
  reviewRating?: Maybe<Scalars['Float']>;
  reviewCount?: Maybe<Scalars['Float']>;
  productRecommendationsEnabled?: Maybe<Scalars['Boolean']>;
  isInStock?: Maybe<Scalars['Boolean']>;
};

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields';
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type CreateProductVariantCustomFieldsInput = {
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type UpdateProductVariantCustomFieldsInput = {
  tierPriceEnabled?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  shippingBusinessPrice?: Maybe<Scalars['Float']>;
};

export type CustomFields = {
  __typename?: 'CustomFields';
  Address: Array<CustomFieldConfig>;
  Collection: Array<CustomFieldConfig>;
  Customer: Array<CustomFieldConfig>;
  Facet: Array<CustomFieldConfig>;
  FacetValue: Array<CustomFieldConfig>;
  Fulfillment: Array<CustomFieldConfig>;
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

export type AuthenticationInput = {
  native?: Maybe<NativeAuthInput>;
};

export type NativeAuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

type DiscriminateUnion<T, U> = T extends U ? T : never;

export namespace Fulfillment {
  export type Fragment = FulfillmentFragment;
}

export namespace LinesFragment {
  export type Fragment = LinesFragmentFragment;
  export type Adjustments = NonNullable<(NonNullable<LinesFragmentFragment['adjustments']>)[number]>;
  export type FeaturedAsset = (NonNullable<LinesFragmentFragment['featuredAsset']>);
  export type Items = NonNullable<(NonNullable<LinesFragmentFragment['items']>)[number]>;
  export type Fulfillment = (NonNullable<NonNullable<(NonNullable<LinesFragmentFragment['items']>)[number]>['fulfillment']>);
  export type ProductVariant = (NonNullable<LinesFragmentFragment['productVariant']>);
  export type CustomFields = (NonNullable<(NonNullable<LinesFragmentFragment['productVariant']>)['customFields']>);
}

export namespace PaymentFragment {
  export type Fragment = PaymentFragmentFragment;
  export type Refunds = NonNullable<(NonNullable<PaymentFragmentFragment['refunds']>)[number]>;
}

export namespace ShippingAddress {
  export type Fragment = ShippingAddressFragment;
}

export namespace BillingAddressFragment {
  export type Fragment = BillingAddressFragmentFragment;
}

export namespace PackingSlip {
  export type Fragment = PackingSlipFragment;
}

export namespace GetPackingSlip {
  export type Variables = GetPackingSlipQueryVariables;
  export type Query = GetPackingSlipQuery;
  export type GetPackingSlip = (NonNullable<GetPackingSlipQuery['getPackingSlip']>);
}

export namespace GetOrderDetail {
  export type Variables = GetOrderDetailQueryVariables;
  export type Query = GetOrderDetailQuery;
  export type Order = (NonNullable<GetOrderDetailQuery['order']>);
  export type Lines = NonNullable<(NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['lines']>)[number]>;
  export type CustomFields = (NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['customFields']>);
  export type Customer = (NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['customer']>);
  export type Fulfillments = NonNullable<(NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['fulfillments']>)[number]>;
  export type Payments = NonNullable<(NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['payments']>)[number]>;
  export type Promotions = NonNullable<(NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['promotions']>)[number]>;
  export type ShippingAddress = (NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['shippingAddress']>);
  export type ShippingMethod = (NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['shippingMethod']>);
  export type BillingAddress = (NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['billingAddress']>);
  export type Channels = NonNullable<(NonNullable<(NonNullable<GetOrderDetailQuery['order']>)['channels']>)[number]>;
}

export namespace AddFulfillmentToOrder {
  export type Variables = AddFulfillmentToOrderMutationVariables;
  export type Mutation = AddFulfillmentToOrderMutation;
  export type AddFulfillmentToOrder = (NonNullable<AddFulfillmentToOrderMutation['addFulfillmentToOrder']>);
  export type FulfillmentInlineFragment = (DiscriminateUnion<(NonNullable<AddFulfillmentToOrderMutation['addFulfillmentToOrder']>), { __typename?: 'Fulfillment' }>);
}

export namespace FulfillOrder {
  export type Variables = FulfillOrderMutationVariables;
  export type Mutation = FulfillOrderMutation;
  export type FulfillOrder = (NonNullable<FulfillOrderMutation['fulfillOrder']>);
  export type FulfillmentInlineFragment = (DiscriminateUnion<(NonNullable<FulfillOrderMutation['fulfillOrder']>), { __typename?: 'Fulfillment' }>);
}

export namespace OrderFragment {
  export type Fragment = OrderFragmentFragment;
  export type CustomFields = (NonNullable<OrderFragmentFragment['customFields']>);
  export type Customer = (NonNullable<OrderFragmentFragment['customer']>);
  export type Channels = NonNullable<(NonNullable<OrderFragmentFragment['channels']>)[number]>;
}

export namespace GetListOrders {
  export type Variables = GetListOrdersQueryVariables;
  export type Query = GetListOrdersQuery;
  export type Orders = (NonNullable<GetListOrdersQuery['orders']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<GetListOrdersQuery['orders']>)['items']>)[number]>;
}

export namespace CountOrderByStatus {
  export type Variables = CountOrderByStatusQueryVariables;
  export type Query = CountOrderByStatusQuery;
}

export type FulfillmentFragment = (
  { __typename?: 'Fulfillment' }
  & Pick<Fulfillment, 'nextStates' | 'id' | 'createdAt' | 'updatedAt' | 'state' | 'method' | 'trackingCode'>
);

export type LinesFragmentFragment = (
  { __typename?: 'OrderLine' }
  & Pick<OrderLine, 'id' | 'quantity' | 'linePrice' | 'linePriceWithTax' | 'lineTax'>
  & { adjustments: Array<(
    { __typename?: 'Adjustment' }
    & Pick<Adjustment, 'adjustmentSource' | 'amount' | 'description' | 'type'>
  )>, featuredAsset?: Maybe<(
    { __typename?: 'Asset' }
    & Pick<Asset, 'preview'>
  )>, items: Array<(
    { __typename?: 'OrderItem' }
    & { fulfillment?: Maybe<(
      { __typename?: 'Fulfillment' }
      & Pick<Fulfillment, 'id' | 'state' | 'method' | 'trackingCode'>
    )> }
  )>, productVariant: (
    { __typename?: 'ProductVariant' }
    & Pick<ProductVariant, 'id' | 'name' | 'sku' | 'stockOnHand' | 'trackInventory'>
    & { customFields?: Maybe<(
      { __typename?: 'ProductVariantCustomFields' }
      & Pick<ProductVariantCustomFields, 'weight'>
    )> }
  ) }
);

export type PaymentFragmentFragment = (
  { __typename?: 'Payment' }
  & Pick<Payment, 'id' | 'createdAt' | 'method' | 'amount' | 'state' | 'transactionId' | 'metadata'>
  & { refunds: Array<(
    { __typename?: 'Refund' }
    & Pick<Refund, 'id'>
  )> }
);

export type ShippingAddressFragment = (
  { __typename?: 'OrderAddress' }
  & Pick<OrderAddress, 'city' | 'company' | 'country' | 'fullName' | 'phoneNumber' | 'postalCode' | 'province' | 'streetLine1' | 'streetLine2'>
);

export type BillingAddressFragmentFragment = (
  { __typename?: 'OrderAddress' }
  & Pick<OrderAddress, 'fullName' | 'company' | 'streetLine1' | 'streetLine2' | 'city' | 'province' | 'postalCode' | 'country' | 'countryCode' | 'phoneNumber'>
);

export type PackingSlipFragment = (
  { __typename?: 'PackingSlip' }
  & Pick<PackingSlip, 'origin' | 'invoice_reference' | 'shipment_width' | 'pin' | 'cl' | 'intl' | 'origin_state_code' | 'cd' | 'ewbn' | 'rph' | 'shipment_length' | 'snm' | 'barcode' | 'origin_city' | 'weight' | 'pt' | 'rs' | 'destination' | 'si' | 'destination_city' | 'hsn_code' | 'tin' | 'contact' | 'origin_state' | 'oid_barcode' | 'sid' | 'cst' | 'prd' | 'rcty' | 'consignee_gst_tin' | 'cnph' | 'sadd' | 'oid' | 'customer_state' | 'mot' | 'radd' | 'customer_state_code' | 'address' | 'rst' | 'seller_gst_tin' | 'shipment_height' | 'pdd' | 'product_type' | 'name' | 'st_code' | 'cl_logo' | 'st' | 'client_gst_tin' | 'etc' | 'delhivery_logo' | 'client_type' | 'cod' | 'wbn' | 'sort_code' | 'rpin'>
);

export type GetPackingSlipQueryVariables = Exact<{
  trackingCode: Scalars['String'];
}>;


export type GetPackingSlipQuery = (
  { __typename?: 'Query' }
  & { getPackingSlip?: Maybe<(
    { __typename?: 'PackingSlip' }
    & PackingSlipFragment
  )> }
);

export type GetOrderDetailQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetOrderDetailQuery = (
  { __typename?: 'Query' }
  & { order?: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'active' | 'createdAt' | 'updatedAt' | 'code' | 'state' | 'currencyCode' | 'nextStates' | 'shipping' | 'shippingWithTax' | 'subTotal' | 'subTotalBeforeTax' | 'total' | 'totalBeforeTax'>
    & { lines: Array<(
      { __typename?: 'OrderLine' }
      & LinesFragmentFragment
    )>, customFields?: Maybe<(
      { __typename?: 'OrderCustomFields' }
      & Pick<OrderCustomFields, 'session'>
    )>, customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'firstName' | 'lastName'>
    )>, fulfillments?: Maybe<Array<(
      { __typename?: 'Fulfillment' }
      & FulfillmentFragment
    )>>, payments?: Maybe<Array<(
      { __typename?: 'Payment' }
      & PaymentFragmentFragment
    )>>, promotions: Array<(
      { __typename?: 'Promotion' }
      & Pick<Promotion, 'id' | 'name' | 'couponCode'>
    )>, shippingAddress?: Maybe<(
      { __typename?: 'OrderAddress' }
      & ShippingAddressFragment
    )>, shippingMethod?: Maybe<(
      { __typename?: 'ShippingMethod' }
      & Pick<ShippingMethod, 'code' | 'description' | 'id' | 'name'>
    )>, billingAddress?: Maybe<(
      { __typename?: 'OrderAddress' }
      & BillingAddressFragmentFragment
    )>, channels?: Maybe<Array<Maybe<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id'>
    )>>> }
  )> }
);

export type AddFulfillmentToOrderMutationVariables = Exact<{
  input: FulfillOrderInput;
}>;


export type AddFulfillmentToOrderMutation = (
  { __typename?: 'Mutation' }
  & { addFulfillmentToOrder: (
    { __typename?: 'Fulfillment' }
    & FulfillmentFragment
  ) | { __typename?: 'EmptyOrderLineSelectionError' } | { __typename?: 'ItemsAlreadyFulfilledError' } | { __typename?: 'InsufficientStockOnHandError' } }
);

export type FulfillOrderMutationVariables = Exact<{
  input: FulfillOrderInput;
}>;


export type FulfillOrderMutation = (
  { __typename?: 'Mutation' }
  & { fulfillOrder: (
    { __typename?: 'Fulfillment' }
    & FulfillmentFragment
  ) | { __typename?: 'EmptyOrderLineSelectionError' } | { __typename?: 'ItemsAlreadyFulfilledError' } | { __typename?: 'InsufficientStockOnHandError' } }
);

export type OrderFragmentFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'id' | 'code' | 'createdAt' | 'updatedAt' | 'currencyCode' | 'nextStates' | 'orderPlacedAt' | 'state' | 'total'>
  & { customFields?: Maybe<(
    { __typename?: 'OrderCustomFields' }
    & Pick<OrderCustomFields, 'session'>
  )>, customer?: Maybe<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'firstName' | 'lastName'>
  )>, channels?: Maybe<Array<Maybe<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'code'>
  )>>> }
);

export type GetListOrdersQueryVariables = Exact<{
  options?: Maybe<OrderListOptions>;
}>;


export type GetListOrdersQuery = (
  { __typename?: 'Query' }
  & { orders: (
    { __typename?: 'OrderList' }
    & Pick<OrderList, 'totalItems'>
    & { items: Array<(
      { __typename?: 'Order' }
      & OrderFragmentFragment
    )> }
  ) }
);

export type CountOrderByStatusQueryVariables = Exact<{
  filter?: Maybe<OrderFilterCondition>;
}>;


export type CountOrderByStatusQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countOrderByStatus'>
);
