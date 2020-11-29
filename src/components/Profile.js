import React from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.changeAvatarPicture = this.changeAvatarPicture.bind(this);
    this.state = {
      currentPictureURL: null
    };
  }

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/")
      .then(response => {
        this.setState({
          currentPictureURL: response.data.results[0].picture.large
        });
      })
      .catch(error => {
        console.log("Axios error:", error);
      });
  }

  changeAvatarPicture() {
    axios
      .get("https://randomuser.me/api/")
      .then(response => {
        this.setState({
          currentPictureURL: response.data.results[0].picture.large
        });
      })
      .catch(error => {
        console.log("error:", error);
      });
  }

  render() {
    const { currentPictureURL } = this.state;

    return (
      <Card className="profile-card" variant="outlined">
        <CardMedia
          component="img"
          alt="If the picture doesn't show try clicking the button below"
          height="150"
          width="150"
          className="profilePictureContainer"
          image={currentPictureURL}
          title="Bilbo Baggins"
        />
        <CardContent>
          <Typography gutterBottom varian="h5" component="h2">
            Bilbo Baggins
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            It's a dangerous business, Frodo, going out your door. You step onto
            the road, and if you don't keep your feet, there's no knowing where
            you might be swept off to.
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          onClick={this.changeAvatarPicture}
        >
          Toggle avatar
        </Button>
      </Card>
    );
  }
}

export default Profile;
