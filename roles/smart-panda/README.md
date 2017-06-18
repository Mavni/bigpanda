Role Name
=========

This role will deploy the smartest Panda in the world, right in your puny VM!
If you want to behold the wonders of smart-panda, all you have to do is send a POST request to 
http://localhost:13372 (because she's 1337 too!) and by sending GET requests, you can see the counter go up!
Well isn't that one smart panda?

playing around with curl could be usefull here, try:
curl -d "" http://localhost:13372
and
curl http://localhost:13372

After you collect your jaw from the floor, send us your comments to hireMavni@bigpanda.com


Requirements
------------

You will need Node.js with npm installed, but everything's all been taken care of, all prerequisites will be installed with the app

Role Variables
--------------

Changing the port is possible via the config file

Dependencies
------------

nodejs

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

    - hosts: servers
      roles:
         - { role: smart-panda }

License
-------

BSD

Author Information
------------------

Michael Avni had just learned to work with Ansible for this project, and already fell in love with it,  brg on some more!
