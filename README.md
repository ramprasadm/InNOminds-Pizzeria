Team Name 	: InNOminds
URL 		:  Pizza Application 			- https://pizzariastore.mybluemix.net/
			   Pizza Chatbot application 	-  https://pizzariabot.mybluemix.net/
Description	:	The product is a Pizza Ordering Service (Pizzeria) which caters to all types of customers. Any type of customer can order the pizza online. Customer can select the product/item he/she wants to purchase and proceed for payment. It integrates to the payment gateway and payment can also be done thru online. The system is highly scalable and available and customers can access the application any time. Along with the accessibility features, the product has additional built-in features like speech-to-text  and text-to-speech which would help the customers to use their voice commands to perform the operations. Customers can communicate with the company representatives anytime through chatbot or voice commands or through mails or thru text and raise a complaint and get their queries clarified. The services are built in such a way that they can be pluggable/integrated to any application.. These features will help the company to go global and increase the customer base.

Team Members : Marrapu Ramprasad, Bindu Priya, Sai K Kumar, Riyaz Basha Shaik, Kiran Mushnuri

Technical Components : 
1) Pizzeria Application has two components : 1) Pizza App 2) Chatbot App
2) Both the apps are deployed seperately to build micro service architecture.
3) If the pizza app is down, the customer could order the pizza through Chatbot
4) If the Chatbot app is down and the main pizza app is up and running. Customer could order the pizza. For status enquiry, we have a Call me button in the Contact UI. Once the customer clicks on Call Me button, company will contact the customer
5) Pizza app and Chatbot app leverage the Speech To Text and Text To Speech services. Both the services are being integrated.
6) For Chatbot, we use Watson Conversation service.
7) This app has been tested with Chrome VOX plugin.
8) All the widgets in the app are ADA complaint. we have verified the same trhough Google AXE plugin.
9) This app works best in Google Chrome as are HTML5 components. Some components, like Date Picker, may not work in Internet Explorer (IE)
10) This app has been tested in Mobile browser as well.
11) We have integrated the wallets also. But for demo purpose Its just hardcoded.
12) If someone wants to build both the applications locally, pizzariastore app runs on 3010 and pizzariabot runs on 3000.
13) For Pizzariastore app once we clone the github project, run "npm install && npm start"
14) For pizzariabot app we clone the github project, run "npm install" and then npm build run, then run "npm start"
13) For Pizzariabot, we have taken watson conversations github project and enhanced to fit to our requirements.
