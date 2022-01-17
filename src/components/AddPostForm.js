import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core'
import FileBase64 from "react-file-base64"
import { useDispatch } from "react-redux"

import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { createPost } from "../actions/post";

const useStyles = makeStyles( (theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(3)
    }
}))

const tags = ["fun", "programming", "health", "science"];

const postScheme = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.string().oneOf(tags)
})

const AddPostForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);

    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(postScheme)
    })

    const onSubmit = (data) => {
        console.log(data);
        //Dispatch create post action 
        dispatch(createPost( {...data, image: file} ))
        clearForm();
    }

    const clearForm = () => {
        reset();
        setFile(null);
        handleClose();
    }

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>
                Create New Article
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    fill out the following form for add a new Text
                </DialogContentText>
                <div className={classes.root} >
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
                        <TextField
                            id="title"
                            label="Title"
                            name="title"
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            {...register("title")}
                            fullWidth
                        />
                        <TextField
                            id="subtitle"
                            label="SubTitle"
                            name="subtitle"
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            {...register("subtitle")}
                            fullWidth
                        />

                        <Controller
                            render={
                                ({ field }) => (
                                    <Select
                                        {...field}
                                        input={<Input />}
                                        className={classes.textField}
                                        fullWidth
                                    >
                                        {
                                            tags.map((tag, index) => (
                                                <MenuItem key={index} value={tag}>
                                                    {tag}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                            name="tag"
                            control={control}
                            defaultValue={tags[0]}
                        />

                        <TextField
                            id="content"
                            label="content"
                            name="content"
                            multiline
                            minRows={4}
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            {...register("content")}
                            fullWidth
                        />
                        <FileBase64 multiple={false} onDone={ ({base64}) => setFile(base64) } />

                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="inherit" onClick={clearForm} >Cancel</Button>
                <Button type="submit" color="primary" variant="outlined" onClick={() => handleSubmit(onSubmit)() } >Publish</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPostForm
