import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../../../src/interface";
import axios from "axios";



export const fetchCommentsThunk = createAsyncThunk<Comment[], void, {rejectValue: string}>('comments/fetchComments', async(_,thunkAPI)=>{
    try {
        const response = await axios.get('http://localhost:3000/api/comments/', {withCredentials:true})
        
        console.log({fetchComment: response})
        if(!response) return thunkAPI.rejectWithValue("No response!")

            return response.data
    } catch (error) {
        thunkAPI.rejectWithValue("Request unsuccessful!")
    }
})