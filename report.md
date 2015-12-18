Vagrant:
er hugbúnaður sem heldur utan um sýndarvélar og notar undir húddinu annan sýndarhugbúnað svo sem VirtualBox og VMware.

VirtualBox:
er forrit sem gerir notandanum kleift að nota hluta af vélbúnaðinum sínum til að ræsa upp sýndarvél með stýrikerfi innan í sínu eigin stýrikerfi.

Grunt:
er tól sem keyrir aðgerðir á borð við minify, compilation, prófanir og yfirferð á kóða.

npm:
er sjálfgefinn (og mest notaði) package-manager fyrir NodeJS

NodeJS:
er JavaScript keyrsluumhverfi fyrir þróun á bakenda vefforritum.

Bower:
er package manager fyrir þróun á framenda vefforritum.



Topology:
Linux Dev og Test vélar keyra í Vagrant með aðstoð Dropbox í Windows umhverfi.
Docker sér um að hýsa gám sem forritið notar til keyrslu.

Þegar breytingar eru gerðar á kóða er nýjustu útgáfu deploy-að á test vélina og þar hægt að gera viðeigandi prófanir.

Jenkins keyrir á Dev vélinni og sér um að sameina alla angana og setja í eina heild.
