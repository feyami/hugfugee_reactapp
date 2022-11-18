import { CameraAlt, Clear, Facebook, Instagram, SportsBasketball, Twitter } from "@mui/icons-material";
import { Autocomplete, Box, Button, Card, Divider, Grid, IconButton } from "@mui/material";
import FlexBox from "components/Box/FlexBox";
import LightTextField from "components/textField/LightTextField";
import { H5, Tiny } from "components/Typography";
import StyledAvatar from "components/StyledAvatar";
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledBadge, StyledChip, StyledInput } from "components/Profile/StyledComponent";
import { useSelector, useDispatch } from "react-redux";
 
import { fetchLanguages } from "redux/features/language/languageSlice";
import { updateUser } from "redux/features/user/userSlice";
import { selectUser } from "redux/features/auth/authSlice";
const UserInfo = () => {
  const dispatch = useDispatch();
  
const user=useSelector(selectUser);
console.log("user",user);
  const {
    t
  } = useTranslation();

  useEffect(() => {
    dispatch(fetchLanguages());
     
  }, [dispatch]);
  const languagesList=useSelector(state=>state.language.languages);
  
  const initialValues = {
    firstName: user?.firstName||"",
    lastName:user?.lastName||"",
    fullName:user?.fullName||"", 
    jobTitle: user?.jobTitle||"",
    address: user?.address||"",
    
    phoneNumber: user?.phoneNumber||"",
    bio: user?.bio||"",
    languages: user?.languages||[],
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: ""
    
  };
  const fieldValidationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "Too Short").required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    
  });



  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: values => {
      dispatch(updateUser({id:user._id,values:{...values,languages:values.languages.map(language=>language._id ),fullName:`${values.firstName} ${values.lastName}`}}));
    }
  });
  return  <Card sx={{
    padding: "1.5rem",
    pb: "4rem"
  }}>
 
      <H5>{t("Edit your account information:")}</H5>
      <form onSubmit={handleSubmit}>
        <FlexBox my="1.5rem" flexWrap="wrap" alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="center"  >
            <StyledBadge overlap="circular" anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }} badgeContent={<label htmlFor="icon-button-file">
                  <input type="file" accept="image/*" id="icon-button-file" style={{
              display: "none"
            }} />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt sx={{
                fontSize: 16,
                color: "background.paper"
              }} />
                  </IconButton>
                </label>}>
              <StyledAvatar alt="Travis Howard" src={user?.photo || "/static/avatar/001-man.svg"} sx={{
              width: 90,
              height: 90
            }} />
            </StyledBadge>
            <Box ml="1rem">
              <H5>{values.fullName}</H5>
              <Tiny color="text.disabled">Volunteer</Tiny>
            </Box>
          </FlexBox>

          
        </FlexBox>

        <Grid container spacing={4}>
         

          <Grid item xs={12}>
            <Divider sx={{
            width: "100%"
          }} />
          </Grid>

           

          <Grid item xs={12} sm={6}>
          <LightTextField fullWidth name="firstName" label="First Name" value={values.firstName} onChange={handleChange} helperText={touched.firstName && errors.firstName} error={Boolean(touched.firstName && errors.firstName)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LightTextField fullWidth name="lastName" label="Last Name" value={values.lastName} onChange={handleChange} helperText={touched.lastName && errors.lastName} error={Boolean(touched.lastName && errors.lastName)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LightTextField fullWidth name="phoneNumber" label="Phone Number" value={values.phoneNumber} onChange={handleChange} helperText={touched.phoneNumber && errors.phoneNumber} error={Boolean(touched.phoneNumber && errors.phoneNumber)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LightTextField fullWidth name="address" label="Address" value={values.address} onChange={handleChange} helperText={touched.address && errors.address} error={Boolean(touched.address && errors.address)} />
        </Grid>
        
      <Grid item xs={12} sm={6}>
      <Autocomplete
      multiple
      name="languages"
      id="languages"
      options={languagesList}
      getOptionLabel={option => option?.title}
      value={values.languages}
      filterSelectedOptions
      onChange={(e, values) => {console.log("eee",values); setFieldValue("languages", values)}}
      renderInput={(params) => (
        <LightTextField
          {...params}
          label="Languages"
          placeholder="Add Language"
        />
      )}
    />
      </Grid>

 


      
      <Grid item xs={12} sm={6}>
          <LightTextField fullWidth name="jobTitle" label="Job Title" value={values.jobTitle} onChange={handleChange} helperText={touched.jobTitle && errors.jobTitle} error={Boolean(touched.jobTitle && errors.jobTitle)} />
        </Grid>

        <Grid item xs={12}>
          <LightTextField fullWidth multiline rows={10} name="bio" value={values.bio} onChange={handleChange} label="About you / Bio" helperText={touched.bio && errors.bio} error={Boolean(touched.bio && errors.bio)} sx={{
          "& .MuiOutlinedInput-root textarea": {
            padding: 0
          }
        }} />
        </Grid>
         

          <Grid item xs={12}>
            <Divider sx={{
            width: "100%"
          }} />
          </Grid>

          <Grid item xs={12}>
            <H5>{t("Social Profiles")}</H5>
          </Grid>

          <Grid item xs={12} sm={6}>
            <StyledInput fullWidth name="facebookUrl" onChange={handleChange} value={values.facebookUrl} placeholder="Facebook URL" startAdornment={<Facebook sx={iconStyle} />} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledInput fullWidth name="twitterUrl" onChange={handleChange} value={values.twitterUrl} placeholder="Twitter URL" startAdornment={<Twitter sx={iconStyle} />} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledInput fullWidth name="instagramUrl" onChange={handleChange} value={values.instagramUrl} placeholder="Instagram URL" startAdornment={<Instagram sx={iconStyle} />} />
          </Grid>
          
       
          <Grid item xs={12}>
          <Divider sx={{
          width: "100%"
        }} />
        </Grid>
        <Grid item xs={12}> 
        <FlexBox justifyContent="space-between"  >
            <Button variant="outlined" sx={{
            width: 124,
            color: "text.disabled",
            borderColor: "text.disabled"
          }} fullWidth>
              {t("Cancel")}
            </Button>
            <Button fullWidth type="submit" variant="contained" sx={{
            width: 124
          }}>
              {t("Save")}
            </Button>
          </FlexBox>
          </Grid>
          </Grid>
      </form>
    </Card>;
}; // common social icons styles


const iconStyle = {
  mr: 1,
  color: "text.disabled"
}; // autocomplete render input function

const renderInput = params => <LightTextField {...params} placeholder="Add Tags" sx={{
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    padding: 0
  }
}} />; // autocomplete render tag function


const renderTags = (tagValue, getTagProps) => tagValue.map((option, index) => <StyledChip label={option} deleteIcon={<Clear />} {...getTagProps({
  index
})} />); // tag list item


//* const languages = ["Ukrainian", "	Dari Persian", "Pashto","Arabic"]; *//



export default UserInfo;