Ext.define('CookBook.model.ProjectInformation', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'project_id',
        type: 'int'
    }, 'project_number', 'project_name', 'customer_project_number', 'company', 'primary_business_unit', 'additional_business_units', 'rfq_loe_recv_date', 'quote_loe_due_date', 'requested_uat_date', 'requested_prod_date', 'expedite', 'preapproved', 'conference_call', 'linked', 'link_type', 'description', 'project_folder', 'button_uat', 'button_prod', 'access_usan', 'visio_drop', 'project_notes', 'doc_visio', 'doc_vui', 'doc_other', 'application', 'parm', 'reporting_button', 'reporting_vision', 'reporting_other', 'tables_xls_csv', 'tables_metafile', 'tables_def_file', 'tables_usan_update_load', 'tables_customer_update_usan_load', 'tables_customer_update_load', 'prompts_standard', 'prompts_nlu', 'routing_new_800_nums', 'routing_remove_800_nums', 'routing_redirect_800_nums', 'routing_dap_ss7', 'traffic', 'scraper', 'new_tran_type', 'engine', 'grammars_standard', 'grammars_vxml', 'backoffice_db', 'backoffice_process', 'backoffice_webservices', 'network_file_transfer', 'network_infrastructure', 'host_connectivity', 'host_wsdl', 'tnt', 'tts', 'speech_rec', 'uui', 'readi800', 'access_usan_user_access', 'nuance_development', 'nuance_ndm', 'service_id', 'biso_approval', 'other', 'linked_projects', 'project_dependencies', 'scheduled_uat_date', 'scheduled_prod_date', 'quote_loe_issue_date', 'auth_due_date', 'auth_recv_date', 'uat_accepted_date', 'prod_complete_date', 'current_project_status', 'updated_specs_recv', 'revised_uat_date', 'uat_acceptance_due', 'soak', 'doc_decommission', 'application_decommission', 'parm_decommission', 'reporting_decommission', 'tables_decommission', 'next_steps']
});