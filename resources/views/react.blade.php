<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React App</title>
</head>

<body>
    {{-- the id root element is where the React application will be rendered, go to file 'users-homepage.js - entry file for the Missions React app' to see this is selected and the <App /> is rendered--}}
    <div id="root"></div>
    {{-- // the below ensures the React application is loaded. we need to go into the webpack mix file and add there the correct command--}}
    <script src="{{ mix('js/react.js') }}"></script>
</body>

</html>