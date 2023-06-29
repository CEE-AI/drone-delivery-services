## Drones task


:scroll: **START**


### Introduction

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

---

### Task description

I registered **10 drones** of different capacities of carrying **medications** and 5 states of activity.

The **Drones** have:
- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

Each **Medication** has: 
- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).

I developed a REST API that allows **dispatch controller**

This drone service allows:

- registering a drone:
the drones are registered and given the state: IDLE and an array object **loadMedications** added to the database

- loading a drone with medication items:
medication items are created and mapped as **medIds** to **loadMedications** thus changing the state to **LOADED**

- checking loaded medication items for a given drone: 
The drones are checked if medications are **LOADED** for delivery, if so the state is changed to **DELIVERING**, when successfully delivered, the loaded medications are removed and **loadMedication** object is deleted, status changes to **DELIVERED**

- checking available drones for loading:
checking for the availability of the service drones for loading with the status **LOADING**

- check drone battery level for a given drone;
check the drone battery which is critical for effective delivery service, with battery level lower than **25%** restricted from service and placed in the state: **IDLE**

A **realtime** battery log is created to ascertain the drones ready for service within the **minute**

**stack**
JavaScript vanilla (frontend) and ExpressJS (backend)

:scroll: **END**
