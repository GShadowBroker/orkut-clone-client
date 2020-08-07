import React, { useState } from 'react'

import {  Switch, Route, useParams, useRouteMatch, useHistory } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { FIND_USER, GET_USER_ALBUNS, CREATE_NEW_ALBUM } from '../services/queries'

import Notification from '../components/utils/Notification'
import FoldersMainSkeleton from '../components/skeletons/FoldersMainSkeleton'

import FoldersMain from '../components/profile/FoldersMain'
import PhotosMain from '../components/profile/PhotosMain'
import PhotoDetail from '../components/profile/PhotoDetail'

const ProfilePhotos = ({ loggedUser }) => {
    const { userId } = useParams()
    const match = useRouteMatch()
    const history = useHistory()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModal = () => {
        if (isModalOpen) {
            document.querySelector('body').style.overflowY = ''
            setIsModalOpen(false)
        } else {
            document.querySelector('body').style.overflowY = 'hidden'
            setIsModalOpen(true)
        }
    }

    const { error, loading, data } = useQuery(FIND_USER, {
        variables: { userId }
    })
    const { error: errorAlbuns, loading: loadingAlbuns, data: dataAlbuns } = useQuery(GET_USER_ALBUNS, {
        variables: { userId }
    })
    const [createNewAlbum, { loading: loadingAlbumCreation }] = useMutation(CREATE_NEW_ALBUM, {
        onError: error => console.log(error),
        refetchQueries: [
            { query: GET_USER_ALBUNS, variables: { userId } }
        ],
        onCompleted: data => {
            if (!data ) return
            handleModal()
            history.push(`/perfil/${userId}/albuns/${data.createPhotoFolder.id}/fotos`)
        }
    })

    if (error || errorAlbuns) return <Notification />
    if (loading || loadingAlbuns) return <FoldersMainSkeleton />

    const isFriend = loggedUser.Friends.map(f => f.id).indexOf(userId) >= 0
    const meOrFriend = (loggedUser.id === userId) || isFriend

    const user = data && data.findUser
    const albuns = dataAlbuns && dataAlbuns.findPhotoFolders
    const getAlbumCount = () => {
        if (!albuns) return 0
        if (meOrFriend) return albuns.length
        return albuns.length - albuns.filter(a => a.visible_to_all === false).length
    }

    return (
        <Switch>
            <Route exact path={`${match.path}/:folderId/fotos/:photoId`}>
                <PhotoDetail
                    user={ user }
                    loggedUser={ loggedUser }
                    albuns={ albuns }
                />
            </Route>

            <Route exact path={`${match.path}/:folderId/fotos`}>
                <PhotosMain
                    user={ user }
                    loggedUser={ loggedUser }
                    albuns={ albuns }
                />
            </Route>

            <Route exact path={`${match.path}`}>
                <FoldersMain
                    user={ user }
                    loggedUser={ loggedUser }
                    albuns={ albuns }
                    getAlbumCount={ getAlbumCount }
                    createNewAlbum={ createNewAlbum }
                    loadingAlbumCreation={loadingAlbumCreation}
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                />
            </Route>
        </Switch>
    )
}

export default ProfilePhotos