# Kubernetes 

Cluster management for containers. Kubernetes consists of 5 servers. The master and 4 minions each hosted on their own VM.

#### Master
The master controls the cluster and hosts the api-server, which runs the show.

#### Minions
The minions host the containers, wrapped in what are referred to as pods.

#### Pods
Each pod can contain one or more containers. The pods act like their own little VM, managing network traffic and resources.

#### Replication Controllers
To direct the pods are replication controllers. These monitor the pods and add or remove them as directed by the replication controllers configuration and unexpected events. 

#### Services
Services direct the traffic between and to and from the pods. Services manage load balancing, session affinity and DNS routing.

