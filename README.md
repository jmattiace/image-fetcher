# Image Fetcher

Image Fetcher is a proxy-like server used to fetch images from remote urls.

Currently, the node.js server is running at `http://ec2-52-53-185-154.us-west-1.compute.amazonaws.com:8080`.

##Deployment
In order to deploy the code to the AWS EC2 instance, first run `git clone`, then run the deploy script `image-fetcher/deploy.sh'`. The deploy script will push the project up to the EC2 instance and run the node server on port 8080. Note: the deploy script will fail to run the node server if there is already a running instance.

To deploy this project to a new server, simply copy it to the destination and run `npm install`, then `node app/app.js` from the root directory. The node server will be running on port 8080.

##Examples
`curl -v http://ec2-52-53-185-154.us-west-1.compute.amazonaws.com:8080/image?url=http%3A%2F%2Fvignette2.wikia.nocookie.net%2Fsuperheroes%2Fimages%2Ff%2Ff9%2FSuperhero.jpg%2Frevision%2Flatest%3Fcb%3D20160706065203 > test-out.jpeg`
