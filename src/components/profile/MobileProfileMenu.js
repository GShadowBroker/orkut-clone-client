import React from 'react'
import { Link } from 'react-router-dom'
import {
    MobileMenuContainer,
    IconContainer,
    ProfileImage
} from '../../styles/layout'
import {

} from '../../styles/profile'
import { AiOutlineMessage } from 'react-icons/ai'
import { MdPhotoCamera, MdVideoLibrary } from 'react-icons/md'
import { IoIosPeople } from 'react-icons/io'

const MobileProfileMenu = ({ user }) => {
    return (
        <MobileMenuContainer>
            <IconContainer>
                <Link to={`/perfil/${user.id}`}>
                    <ProfileImage url={ user.profile_picture } size={ 30 } />
                </Link>
            </IconContainer>
            <IconContainer>
                <Link to={`/perfil/${user.id}/scraps`}>
                    <AiOutlineMessage />
                </Link>
            </IconContainer>
            <IconContainer>
                <Link to={`/perfil/${user.id}/albuns`}>
                    <MdPhotoCamera />
                </Link>
            </IconContainer>
            <IconContainer>
                <Link to={`/perfil/${user.id}/videos`}>
                    <MdVideoLibrary />
                </Link>
            </IconContainer>
            <IconContainer>
                <Link to={`/perfil/${user.id}/depoimentos`}>
                    <IoIosPeople />
                </Link>
            </IconContainer>
        </MobileMenuContainer>
    )
}

export default MobileProfileMenu