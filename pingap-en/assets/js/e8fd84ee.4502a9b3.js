"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[2444],{6462:e=>{e.exports=JSON.parse('{"version":{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Pingap Overview","href":"/pingap-en/docs/introduction","docId":"introduction","unlisted":false},{"type":"link","label":"Getting Started","href":"/pingap-en/docs/getting_started","docId":"getting_started","unlisted":false},{"type":"link","label":"Command Line Arguments","href":"/pingap-en/docs/argument","docId":"argument","unlisted":false},{"type":"link","label":"Configuration Guide","href":"/pingap-en/docs/config","docId":"config","unlisted":false},{"type":"link","label":"Log Formatting","href":"/pingap-en/docs/log","docId":"log","unlisted":false},{"type":"link","label":"HTTPS Certificate Management","href":"/pingap-en/docs/certificate","docId":"certificate","unlisted":false},{"type":"link","label":"Plugin System","href":"/pingap-en/docs/plugin","docId":"plugin","unlisted":false},{"type":"link","label":"Docker","href":"/pingap-en/docs/docker","docId":"docker","unlisted":false},{"type":"link","label":"Frequently Asked Questions","href":"/pingap-en/docs/question","docId":"question","unlisted":false},{"type":"link","label":"Performance Testing","href":"/pingap-en/docs/performance","docId":"performance","unlisted":false}]},"docs":{"argument":{"id":"argument","title":"Command Line Arguments","description":"Pingap is configured through TOML files, but certain startup parameters need to be specified via command line arguments or environment variables:","sidebar":"tutorialSidebar"},"certificate":{"id":"certificate","title":"HTTPS Certificate Management","description":"Pingap provides unified HTTPS certificate management features, including:","sidebar":"tutorialSidebar"},"config":{"id":"config","title":"Configuration Guide","description":"Pingap uses TOML for parameter configuration. For time-related configurations, use formats like 1s, 1m, 1h. For storage size configurations, use formats like 1kb, 1mb, 1gb. Detailed parameter descriptions are as follows:","sidebar":"tutorialSidebar"},"docker":{"id":"docker","title":"Docker","description":"Pingap provides pre-built Docker images that are ready to use. Note that since upgrade operations need to run in daemon mode, the --autorestart parameter cannot be used in Docker environments. However, for automatic configuration updates, you can use the --autoreload parameter.","sidebar":"tutorialSidebar"},"getting_started":{"id":"getting_started","title":"Getting Started","description":"This section explains how to create a reverse proxy service from scratch. To use the upgrade feature for configuration updates, pingap needs to run as a background process.","sidebar":"tutorialSidebar"},"introduction":{"id":"introduction","title":"Pingap Overview","description":"Pingap is a reverse proxy service developed based on pingora. While pingora provides rich modules for Rust developers, it\'s not very friendly for non-Rust developers. Therefore, Pingap offers simple and easy-to-use reverse proxy functionality through TOML configuration files, supporting multiple locations forwarding for a single service and extensibility through plugins. Pre-compiled executables for various architectures can be downloaded from the releases page.","sidebar":"tutorialSidebar"},"log":{"id":"log","title":"Log Formatting","description":"Pingap provides multiple log formatting options, including the following preset formats","sidebar":"tutorialSidebar"},"performance":{"id":"performance","title":"Performance Testing","description":"Performance testing is a complex process that depends on various scenarios. Below are some simple test scenarios.","sidebar":"tutorialSidebar"},"plugin":{"id":"plugin","title":"Plugin System","description":"The plugin system allows you to extend Location\'s functionality by adding various plugins, supporting scenarios like authentication, flow control, response header settings, etc. Through plugins, you can flexibly customize the request handling process.","sidebar":"tutorialSidebar"},"question":{"id":"question","title":"Frequently Asked Questions","description":"Host Header Configuration","sidebar":"tutorialSidebar"}}}}')}}]);