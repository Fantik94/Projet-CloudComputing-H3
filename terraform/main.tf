terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  skip_provider_registration = true
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "dadabapt-rg"
  location = "francecentral"
}

resource "azurerm_virtual_network" "example_vnet" {
  name                = "fantikVnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_public_ip" "example" {
  name                = "Damien-Baptiste-publicip"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  allocation_method   = "Static"
}

/*
resource "azurerm_ssh_public_key" "example" {
  name                = "Damien-Baptiste-sshkey"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  public_key          = file("C:/Users/bapti/.ssh/id_rsa.pub") 
}
*/

resource "azurerm_subnet" "example" {
  name                 = "Damien-Baptiste-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}


resource "azurerm_network_interface" "example" {
  name                = "Damien-Baptiste-nic"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.example.id
  }
}

resource "azurerm_linux_virtual_machine" "example" {
  name                = "Damien-Baptiste-vm"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  size                = "Standard_F2"
  admin_username      = "dadabapt"
  admin_password      = "Dadabapt94340@"
  network_interface_ids = [azurerm_network_interface.example.id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
/*
  admin_ssh_key {
    username   = "fantik"
    public_key = azurerm_ssh_public_key.example.public_key
  } 
  */
  disable_password_authentication = false
}

resource "azurerm_mysql_server" "example" {
  name                = "damienbaptistemysqlserver"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  administrator_login          = "mysqladmin"
  administrator_login_password = "Dadabapt94340@"

  sku_name   = "GP_Gen5_2"
  storage_mb = 5120
  version    = "8.0"

  auto_grow_enabled                 = true
  backup_retention_days             = 7
  geo_redundant_backup_enabled      = false
  infrastructure_encryption_enabled = false
  public_network_access_enabled     = true
  ssl_enforcement_enabled           = true
  ssl_minimal_tls_version_enforced  = "TLS1_2"
}

resource "azurerm_mysql_database" "example" {
  name                = "damienbaptistemysqldb"
  resource_group_name = azurerm_resource_group.example.name
  server_name         = azurerm_mysql_server.example.name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"
}



/*
resource "azurerm_mssql_server" "example" {
  name                         = "fantik-sqlserver"
  resource_group_name          = azurerm_resource_group.example.name
  location                     = azurerm_resource_group.example.location
  version                      = "12.0" 
  administrator_login          = "fantik"
  administrator_login_password = "JeSuisTropBeauEnfait94340@"

  tags = {
    environment = "production"
  }
}

resource "azurerm_mssql_database" "example" {
  name           = "fantik-database"
  server_id      = azurerm_mssql_server.example.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  sku_name       = "S0"
  tags = {
    environment = "production"
  }
}

resource "azurerm_mssql_firewall_rule" "example" {
  name                = "fantik-firewall-rule"
  server_id           = azurerm_mssql_server.example.id
  start_ip_address    = "0.0.0.0" 
  end_ip_address      = "0.0.0.0"
}*/

resource "azurerm_mysql_firewall_rule" "allow_baptiste_ip" {
  name                = "allow_baptiste_ip"
  resource_group_name = azurerm_mysql_server.example.resource_group_name
  server_name         = azurerm_mysql_server.example.name
  start_ip_address    = "86.67.77.134" 
  end_ip_address      = "86.67.77.134" 
}

resource "azurerm_mysql_firewall_rule" "allow_damien_ip" {
  name                = "allow_damien_ip"
  resource_group_name = azurerm_mysql_server.example.resource_group_name
  server_name         = azurerm_mysql_server.example.name
  start_ip_address    = "86.247.29.14" 
  end_ip_address      = "86.247.29.14" 
}

resource "azurerm_mysql_firewall_rule" "allow_private_ip" {
  name                = "allow_private_ip"
  resource_group_name = azurerm_mysql_server.example.resource_group_name
  server_name         = azurerm_mysql_server.example.name
  start_ip_address    = "10.0.0.0" 
  end_ip_address      = "10.0.0.255" 
}

resource "azurerm_mysql_firewall_rule" "allow_vm_ip" {
  name                = "allow_vm_ip"
  resource_group_name = azurerm_mysql_server.example.resource_group_name
  server_name         = azurerm_mysql_server.example.name
  start_ip_address    = "20.111.16.18" 
  end_ip_address      = "20.111.16.18" 
}

resource "azurerm_network_security_group" "example_nsg" {
  name                = "Damien-Baptiste-nic-nsg"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_network_security_rule" "ssh_rule" {
  name                        = "AllowMyIpAddressSSHInbound"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}

resource "azurerm_network_security_rule" "custom_3000_rule" {
  name                        = "AllowAnyCustom3000Inbound"
  priority                    = 120
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3000"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}

resource "azurerm_network_security_rule" "custom_3001_rule" {
  name                        = "AllowAnyCustom3001Inbound"
  priority                    = 130
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3001"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}

resource "azurerm_network_interface_security_group_association" "example_nic_nsg_association" {
  network_interface_id      = azurerm_network_interface.example.id
  network_security_group_id = azurerm_network_security_group.example_nsg.id
}

resource "azurerm_network_security_rule" "custom_3000_out_rule" {
  name                        = "AllowAnyCustom3000Outbound"
  priority                    = 140
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3000"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}

resource "azurerm_network_security_rule" "custom_3001_out_rule" {
  name                        = "AllowAnyCustom3001Outbound"
  priority                    = 150
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "3001"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}

/*
resource "azurerm_network_security_rule" "allow_internet_out_rule" {
  name                        = "AllowInternetOutBound"
  priority                    = 65001
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "Internet"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}

resource "azurerm_network_security_rule" "deny_all_out_rule" {
  name                        = "DenyAllOutBound"
  priority                    = 65500
  direction                   = "Outbound"
  access                      = "Deny"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.example.name
  network_security_group_name = azurerm_network_security_group.example_nsg.name
}
*/
