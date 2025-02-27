CREATE TABLE citizens (
    citizen_id INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    dob DATE,
    household_id INT,
    educational_qualification VARCHAR(255),
    role VARCHAR(100),
    FOREIGN KEY (household_id) REFERENCES households(household_id)
);

CREATE TABLE households (
    household_id INT PRIMARY KEY,
    address TEXT,
    income DECIMAL(10,2)
);

CREATE TABLE land_records (
    land_id INT PRIMARY KEY,
    citizen_id INT,
    area_acres DECIMAL(10,2),
    crop_type VARCHAR(255),
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

CREATE TABLE scheme_enrollments (
    enrollment_id INT PRIMARY KEY,
    citizen_id INT,
    scheme_id INT,
    enrollment_date DATE,
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id),
    FOREIGN KEY (scheme_id) REFERENCES welfare_schemes(scheme_id)
);

CREATE TABLE welfare_schemes (
    scheme_id INT PRIMARY KEY,
    scheme_name VARCHAR(255),
    beneficiaries TEXT,
    budget DECIMAL(15,2)
);

CREATE TABLE educational_schemes (
    scheme_id INT PRIMARY KEY,
    scholarship_amount DECIMAL(10,2),
    free_meals BOOLEAN,
    literacy_role_target VARCHAR(255),
    FOREIGN KEY (scheme_id) REFERENCES welfare_schemes(scheme_id)
);

CREATE TABLE agri_schemes (
    scheme_id INT PRIMARY KEY,
    subsidy_amount DECIMAL(10,2),
    training TEXT,
    prog_equipment_provided TEXT,
    FOREIGN KEY (scheme_id) REFERENCES welfare_schemes(scheme_id)
);

CREATE TABLE healthcare_schemes (
    scheme_id INT PRIMARY KEY,
    target_disease VARCHAR(255),
    free_medicine_list TEXT,
    FOREIGN KEY (scheme_id) REFERENCES welfare_schemes(scheme_id)
);

CREATE TABLE panchayat_committee_members (
    member_id INT PRIMARY KEY,
    citizen_id INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    contact_number VARCHAR(15),
    term_start_date DATE,
    term_end_date DATE,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

CREATE TABLE citizen_taxes (
    tax_id INT PRIMARY KEY,
    citizen_id INT,
    tax_type VARCHAR(255),
    tax_amount DECIMAL(15,2),
    collection_date DATE,
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

CREATE TABLE census_data (
    census_id INT PRIMARY KEY,
    citizen_id INT,
    household_id INT,
    total_population INT,
    total_male_population INT,
    total_female_population INT,
    employment_rate DECIMAL(5,2),
    literacy_rate DECIMAL(5,2),
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id),
    FOREIGN KEY (household_id) REFERENCES households(household_id)
);

CREATE TABLE environmental_data (
    data_id INT PRIMARY KEY,
    num_of_schemes INT
);

CREATE TABLE air_data (
    data_id INT PRIMARY KEY,
    air_quality_index INT,
    FOREIGN KEY (data_id) REFERENCES environmental_data(data_id)
);

CREATE TABLE water_data (
    data_id INT PRIMARY KEY,
    water_quality_index INT,
    FOREIGN KEY (data_id) REFERENCES environmental_data(data_id)
);

CREATE TABLE waste_management_data (
    data_id INT PRIMARY KEY,
    waste_management_rating INT,
    FOREIGN KEY (data_id) REFERENCES environmental_data(data_id)
);

CREATE TABLE income (
    income_id INT PRIMARY KEY,
    source VARCHAR(255),
    amount DECIMAL(15,2)
);

CREATE TABLE expenditures (
    expend_id INT PRIMARY KEY,
    category VARCHAR(255),
    amount DECIMAL(15,2),
    date DATE
);

CREATE TABLE assets (
    asset_id INT PRIMARY KEY,
    asset_name VARCHAR(255),
    asset_type VARCHAR(255),
    installation_date DATE
);

CREATE TABLE certificates (
    certificate_id INT PRIMARY KEY,
    citizen_id INT,
    type VARCHAR(255),
    issue_date DATE,
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

CREATE TABLE vaccinations (
    vaccination_id INT PRIMARY KEY,
    citizen_id INT,
    vaccine_type VARCHAR(255),
    date_administered DATE,
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

CREATE TABLE government_monitors (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE system_administrators (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE citizen_services (
    service_id INT PRIMARY KEY,
    citizen_id INT,
    service_type VARCHAR(255),
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

CREATE TABLE tax_collections (
    collection_id INT PRIMARY KEY,
    monitor_username VARCHAR(255),
    tax_id INT,
    collection_date DATE,
    FOREIGN KEY (monitor_username) REFERENCES government_monitors(username),
    FOREIGN KEY (tax_id) REFERENCES citizen_taxes(tax_id)
);

CREATE TABLE scheme_maintenance (
    maintenance_id INT PRIMARY KEY,
    sc
heme_id INT,
    maintained_by INT,
    FOREIGN KEY (scheme_id) REFERENCES welfare_schemes(scheme_id),
    FOREIGN KEY (maintained_by) REFERENCES panchayat_committee_members(member_id)
);
