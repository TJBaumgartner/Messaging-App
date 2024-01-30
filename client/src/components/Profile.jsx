import { useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Profile() {

    const navigate = useNavigate()
    const {id} = useParams()
    const [user, setUser] = useState()
    const [displayForm, setDisplayForm] = useState(false)
    const [bio, setBio] = useState('')
    const [about, setAbout] = useState('')
    const [userLoaded, setUserLoaded] = useState(false)
    const [isMyAccount, setIsMyAccount] = useState(null)
    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${id}/profile`, {        
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        .then((response) => {
            if(response.status === 401){
                navigate('/user/list')
            }
            return response.json()
        })
        .then((data) => {
            setUser(data)
            setUserLoaded(true)
        })
    }, [displayForm])

    useEffect(() => {
        checkAccount()
    }, [userLoaded])

    const checkAccount = () => {
        if(userLoaded == true){
            if(user._id == localStorage.getItem('userID')){
                setIsMyAccount(true)
            } else {
                setIsMyAccount(false)
            }
        }
    }
    const showForm = () => {
        setDisplayForm(true)
        setBio(user.bio)
        setAbout(user.about)
    }
    const submitChange = (e) => {
        e.preventDefault();

        const content = {bio, about}
        fetch(`http://localhost:5000/api/user/${id}/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },        
        body: JSON.stringify(content)
        })
        .then((response) => {
            if(response.status === 401){        
                navigate('user/list')
            }
            setDisplayForm(false)
            return response.json()
        })
    }

    return (
        <>
            <Navbar></Navbar>
                {user && displayForm == false &&
                    <div className='profileContainer'>
                        {isMyAccount == false &&
                        <div>
                            <div>
                            <Link to={{
                            pathname: `/user/${user._id}/message`,
                            }}
                            >
                            <h1>{user.username}</h1>
                            </Link>
                            </div>
                            <ul>
                                <li>Bio: {user.bio}</li>
                                <li>About: {user.about}</li>
                            </ul>
                        </div>
                        }
                        {isMyAccount == true &&
                        <div className='profile'>
                            <div className='profileTop'>
                            </div>
                            <div className='profileName'>
                                <h1>{user.username}</h1>
                                <button onClick={() => showForm()}>Edit Profile</button>
                            </div>
                            <ul>
                                <li><h2>Bio:</h2> <p>{user.bio}</p></li>
                                <li><h2>About:</h2> <p>{user.about}</p></li>
                            </ul>
                        </div>
                        }
                    </div>
                }
                {displayForm == true &&
                    <div className='profileContainer'>
                        <h1>{user.username}</h1>
                        <form action="" method='POST' onSubmit={submitChange}>
                            <p>Bio</p>
                            <textarea required value={bio} onChange={(e) => setBio(e.target.value)} maxLength={"200"}></textarea>
                            <p>About</p>
                            <textarea type='text' required value={about} onChange={(e) => setAbout(e.target.value)} maxLength={"200"}></textarea>
                            <button type='submit'>Confirm</button>
                        </form>
                    </div>                
                }
        </>
    )
}

export default Profile
