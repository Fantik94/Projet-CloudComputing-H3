# Projet Cloud Computing - DADABAPT.blog

## Vue d'ensemble
Le projet DADABAPT.blog est une initiative de cloud computing qui met en place un blog interactif utilisant React pour le front-end et Node.js pour le back-end, le tout hébergé sur Azure.

## Membres de l'Équipe
- Damien Raunier
- Baptiste Ringler

## Ressources Azure
Pour garantir la performance et la sécurité de notre application, nous avons utilisé les ressources Azure suivantes :
- **Machines Virtuelles Azure** pour l'hébergement des applications front-end et back-end.
- **Azure Database pour MySQL** pour la gestion des données.
- **Azure Virtual Network** pour la mise en réseau sécurisée.
- **Groupes de Sécurité Réseau** pour la régulation du trafic.
- **Règles d'alerte et actions** pour la surveillance des performances.

## Terraform dans Azure
Notre infrastructure est gérée par Terraform, ce qui permet une mise en place et une maintenance efficaces des ressources Azure. Le code Terraform déclare :
- Un groupe de ressources avec une localisation spécifique.
- Un réseau virtuel avec des sous-réseaux configurés.
- Des adresses IP publiques statiques.
- Des interfaces réseau.
- Une machine virtuelle Linux avec des configurations d'accès et de sécurité.
- Un serveur MySQL avec des règles de pare-feu pour des adresses IP spécifiques.


## Architecture et Sécurité
Nous avons une architecture bien définie avec une séparation claire entre le front-end et le back-end. Les communications sont sécurisées grâce aux groupes de sécurité réseau et à des politiques de pare-feu strictes. Des métriques et alertes sont en place pour une réponse rapide aux incidents.

---
