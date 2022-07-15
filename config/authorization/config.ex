alias Acl.Accessibility.Always, as: AlwaysAccessible
alias Acl.GraphSpec.Constraint.Resource, as: ResourceConstraint
alias Acl.GraphSpec.Constraint.ResourceFormat, as: ResourceFormatConstraint
alias Acl.Accessibility.ByQuery, as: AccessByQuery
alias Acl.GraphSpec, as: GraphSpec
alias Acl.GroupSpec, as: GroupSpec
alias Acl.GroupSpec.GraphCleanup, as: GraphCleanup

defmodule Acl.UserGroups.Config do

 @error_type [
   "https://docs.oasis-open-projects.org/oslc-op/core/v3.0/os/core-vocab.html#Error"
 ]

 @protected_resource_type [
                        "http://www.w3.org/ns/org#Organization",
                        "http://data.vlaanderen.be/ns/besluit#Besluit",
                        "https://data.vlaanderen.be/ns/besluitvorming#Beslissingsactiviteit",
                        "http://data.vlaanderen.be/ns/besluit#Bestuurseenheid",
                        "http://data.lblod.info/vocabularies/erediensten/BestuurVanDeEredienst",
                        "http://data.vlaanderen.be/ns/besluit#Bestuursorgaan",
                        "http://data.lblod.info/vocabularies/erediensten/RolBedienaar",
                        "http://data.lblod.info/vocabularies/erediensten/VoorwaardenBedienaar",
                        "https://data.vlaanderen.be/ns/persoon#Geboorte",
                        "http://mu.semte.ch/vocabularies/ext/GeslachtCode",
                        "http://data.lblod.info/vocabularies/erediensten/PositieBedienaar",
                        "http://www.w3.org/ns/adms#Identifier",
                        "https://data.vlaanderen.be/ns/generiek#GestructureerdeIdentificator",
                        "http://www.w3.org/ns/org#ChangeEvent",
                        "http://data.lblod.info/vocabularies/erediensten/BetrokkenLokaleBesturen",
                        "http://data.lblod.info/vocabularies/erediensten/VerbondenJuridischeStructuren",
                        "http://www.w3.org/ns/org#Site",
                        "http://www.w3.org/ns/locn#Address",
                        "http://www.w3.org/ns/person#Person",
                        "http://data.vlaanderen.be/ns/mandaat#Mandaat",
                        "http://data.vlaanderen.be/ns/mandaat#Mandataris",
                        "http://data.lblod.info/vocabularies/erediensten/EredienstMandataris",
                        "http://schema.org/ContactPoint",
                        "http://data.lblod.info/vocabularies/leidinggevenden/Bestuursfunctie",
                        "http://data.lblod.info/vocabularies/erediensten/CentraalBestuurVanDeEredienst",
                        "http://data.lblod.info/vocabularies/erediensten/RepresentatiefOrgaan",
                        "http://www.w3.org/ns/org#Role",
                        "http://www.w3.org/ns/org#Post",
                        "http://data.lblod.info/vocabularies/contacthub/AgentInPositie",
                        "http://lblod.data.gift/vocabularies/organisatie/OrganisatieStatusCode",
                        "http://lblod.data.gift/vocabularies/organisatie/BestuursfunctieCode",
                        "http://lblod.data.gift/vocabularies/organisatie/BestuursorgaanClassificatieCode",
                        "http://lblod.data.gift/vocabularies/organisatie/TypeEredienst",
                        "http://lblod.data.gift/vocabularies/organisatie/HelftVerkiezing",
                        "http://lblod.data.gift/vocabularies/organisatie/Veranderingsgebeurtenis",
                        "http://lblod.data.gift/vocabularies/organisatie/VeranderingsgebeurtenisResultaat",
                        "http://lblod.data.gift/vocabularies/organisatie/MandatarisStatusCode",
                        "http://lblod.data.gift/vocabularies/organisatie/BestuurseenheidClassificatieCode",
                        "http://lblod.data.gift/vocabularies/organisatie/TypeBetrokkenheid",
                        "http://lblod.data.gift/vocabularies/organisatie/VoorwaardenBedienaarCriterium",
                        "http://lblod.data.gift/vocabularies/organisatie/BedienaarCriteriumBewijsstuk",
                        "http://lblod.data.gift/vocabularies/organisatie/EredienstBeroepen",
                        "http://lblod.data.gift/vocabularies/organisatie/BedienaarFinanceringCode",
                        "http://lblod.data.gift/vocabularies/organisatie/TypeVestiging",
                        "http://lblod.data.gift/vocabularies/organisatie/Rechtsvormtype",
                        "http://www.w3.org/2004/02/skos/core#ConceptScheme",
                        "http://www.w3.org/2004/02/skos/core#Concept",
                        "http://xmlns.com/foaf/0.1/Image",
                        "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#FileDataObject",
                        "http://publications.europa.eu/ontology/euvoc#Country"
 ]

  def user_groups do
    [
    
      %GroupSpec{
        name: "public",
        useage:  [:read, :write, :read_for_write],
        access: %AlwaysAccessible{},
        graphs: [ %GraphSpec{
                    graph: "http://mu.semte.ch/graphs/organisatieportaal", 
                    constraint: %ResourceConstraint{
                      resource_types: @protected_resource_type ++ @error_type
                    } }]},

      # // CLEANUP
      #
      %GraphCleanup{
        originating_graph: "http://mu.semte.ch/application",
        useage: [:read, :write],
        name: "clean"
      }
    ]
  end
end
