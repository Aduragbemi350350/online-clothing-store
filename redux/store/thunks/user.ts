import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserDetails {
  _id: string;
  username: string;
  email: string;
}

const fetchUserThunk = createAsyncThunk<UserDetails, void, {rejectValue: string}>("user/getUser", async(id, thunkAPI)=>{
    try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)

        if(!response)  {
            console.log({"Fetch user": "There's no response"})
            return thunkAPI.rejectWithValue("There's no response: User can't be fetched")
        }
        return response.data
    } catch (error: any) {
        console.log({"Get User": error?.message})
        return thunkAPI.rejectWithValue("An error occured!")
    }
})

export default fetchUserThunk