import React, {useState} from 'react'
import { Container, TextField, Button, Typography } from "@material-ui/core";  
const ChangePassword = () => {
    const [password, setPassword] = useState({});

    const handleChange=()=>{

    }
    const handleSubmit=()=>{

    }
    return (
        <Container component="main" align="center">
          <form onSubmit={handleSubmit}>
            <Container component="main" align="center" style={{ maxWidth: "60%" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Typography variant="h4">Change Password</Typography>
                <TextField
                  label="Old Password"
                  name="oldPassword"
                  variant="outlined"
                  onChange={handleChange}
                  required
                ></TextField>
                <TextField
                  label="New Password"
                  name="newPassword"
                  onChange={handleChange}
                  variant="outlined"
                  required
                ></TextField>
               
                
                
                <Button variant="contained" type="submit">
                  Update
                </Button>
              </div>
            </Container>
          </form>
        </Container>
      );
}

export default ChangePassword
