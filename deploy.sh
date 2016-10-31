zip -r image-fetcher.zip image-fetcher
scp -i "image-fetcher/ec2-1.pem" image-fetcher.zip ec2-user@ec2-52-53-185-154.us-west-1.compute.amazonaws.com:~/
ssh -i "image-fetcher/ec2-1.pem" ec2-user@ec2-52-53-185-154.us-west-1.compute.amazonaws.com unzip -o image-fetcher.zip
ssh -i "image-fetcher/ec2-1.pem" ec2-user@ec2-52-53-185-154.us-west-1.compute.amazonaws.com npm install image-fetcher
ssh -i "image-fetcher/ec2-1.pem" ec2-user@ec2-52-53-185-154.us-west-1.compute.amazonaws.com node image-fetcher/app/app.js