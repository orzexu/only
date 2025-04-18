Installation<br/>
Clone the repository:

git clone https://github.com/orzexu/only.git<br/>
cd only<br/>


Install dependencies:<br/>
If you haven't used Yarn before:<br/>
npm install -g yarn

yarn install


This installs:
Dependencies:
react, react-dom (^19.1.0)<br/>
gsap (^3.12.7) for animations<br/>
swiper (^11.2.6) for the event slider<br/>

Dev Dependencies:<br/>
typescript (^5.8.3)<br/>
sass (^1.86.3), sass-loader, css-loader<br/>
webpack (^5.99.5), webpack-cli, webpack-dev-server<br/>
eslint (^9.24.0), prettier (^3.5.3)<br/>


Running the Project<br/>
Start the development server:<br/>

yarn dev

This launches the Webpack development server and opens http://localhost:3000 in your default browser. The server supports hot reloading and watches SCSS files for changes.
Interact with the timeline:
Click a period dot in the circle to select a period.
Use the Previous and Next buttons (bottom-left of the circle) to navigate periods.
View events in the slider below, corresponding to the selected period.
