import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import FileBase64 from "react-file-base64"
import { useDispatch } from "react-redux"
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem
} from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import {updatePost} from "../actions/post"

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: theme.spacing(2)
    },
    buttons: {
        marginTop: theme.spacing(2)
    }
}))

const tags = ["fun", "programming", "health", "science"];

const postScheme = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.string().oneOf(tags)
})

const EditPostForm = ({ post, closeEditMode }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(post?.image);

    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(postScheme)
    })

    const onSubmit = (data) => {
        const updatedPost = {
            _id: post._id,
            ...data,
            image: file
        }
        dispatch(updatePost(updatedPost, updatedPost._id))
        reset();
        setFile(null);
        closeEditMode();
    }

    const classes = useStyles();

    return (

        <div>
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
                    defaultValue={post?.title}
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
                    defaultValue={post?.subtitle}
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
                    defaultValue={post?.tag}
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
                    defaultValue={post?.content}
                />
                <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />

                <div className={classes.buttons}>
                    <Button color="secondary" variant="outlined" onClick={closeEditMode} >
                        CANCEL
                    </Button>
                    <Button color="primary" variant="outlined" type="submit" >
                        SAVE
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditPostForm
