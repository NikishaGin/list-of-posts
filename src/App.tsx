import React, {useEffect, useMemo, useState} from 'react';
import './App.css'
import {PostList} from "./Components/PostList";
import {PostFilter} from "./Components/PostFilter";
import {PostForm} from "./Components/PostForm";
import {PostsApi} from "./Api/posts-api";
import {MyLoading} from "./UI/MyLoading";


export type ContentType = {
    id: number,
    title: string,
    body: string,
}

export const App = () => {

    const [content, setContent] = useState<ContentType []>([])
    const [selectedSort, setSelectedSort] = useState('')
    const [search, setSearch] = useState('')
    const [isPostsLoading, setIsPostsLoading] = useState(false)


    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        setIsPostsLoading(true)
        setTimeout (()=>{
            PostsApi.getPosts()
                .then((res) => {
                    setContent(res.data)
                    setIsPostsLoading(false)
                })
        },1500)
    }

    const sortList = (sort: string) => {
        setSelectedSort(sort)
        setContent([...content]
            .sort((a, b) => {
                if (sort === 'По названию') {
                    return a.title.localeCompare(b.title)
                }
                return a.body.localeCompare(b.body)
            }))
        return content
    }

    const sortedAndSearchedPosts = useMemo(() => {
        return content.filter(contentFilter => contentFilter.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, sortList])


    const addPost = (newTitle: string, newBody: string) => {
        let newPost = {id: Date.now(), title: newTitle, body: newBody}
        setContent([newPost,...content])
    }

    const removePost = (id: number) => {
        setContent(content.filter(el => el.id !== id))
    }


    return (
        <div className={'App'}>
            <PostForm addPost={addPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter sortList={sortList} selectedSort={selectedSort} setSearch={setSearch}/>
            {isPostsLoading ?
                <MyLoading/>
                :
                <PostList removePost={removePost} content={sortedAndSearchedPosts} title={'Список постов'}/>
            }
        </div>
    );
};


