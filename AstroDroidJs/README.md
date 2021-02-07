
# Major types of nodes

In this early design, we are creating a simple model of the following robot: https://www.makeblock.com/mbot. At present, we will try to model the node in AFrame using a AFrame component.  The Aframe component will have a node associated with it.

- User input node - This node will have responsibility of sensing user input.  User input will be sent as messages to other nodes.  

- Drive node - This node will have responsibility for moving and turning our robot. 

- Distance sensor node - As a bot driver, I can sense the distance from the front of my robot to another object.   The distance sensor node models the behavior of a sonic range finder. 

- Master node - This node will facilitate the communication of all other nodes.  The master node helps nodes discover each other.  The master node encourages communication between nodes using messages. 

# References
- http://wiki.ros.org/ROS/Concepts
- https://github.com/supermedium/aframe-environment-component
- https://www.tsmean.com/articles/how-to-write-a-typescript-library/
- https://aframe.io/docs/1.2.0/core/systems.html