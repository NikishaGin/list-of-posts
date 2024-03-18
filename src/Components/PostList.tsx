import React from 'react';
import {PostItem} from "./PostItem";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export type ContentType = {
    id: number,
    title: string,
    body: string,
}

type PropsPostListType = {
    content: ContentType []
    title: string
    removePost: (id: number) => void
}

export const PostList = (props: PropsPostListType) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    if (!props.content.length) {
        return <Alert sx={{marginTop: 2}} severity="error">Посты не найдены!</Alert>
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {props.title}
            </h1>

                    <Item>
                        {props.content.map((contentMap,index)=>
                            <PostItem key={contentMap.id}
                                      number={index + 1}
                                      content={contentMap}
                                      removePost={()=>props.removePost(contentMap.id)}
                            />
                        )}
                    </Item>


        </div>
    );
};

