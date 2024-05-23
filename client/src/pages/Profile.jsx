import Header from "@/components/Header.jsx";
import AuthRoute from "@/components/AuthRoute.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {firebaseApp} from "@/../fireabase.js";

const Profile = () => {
    const {user} = useSelector((state) => state.user);
    const [imgFile, setImgFile] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [error, setError] = useState()
    const [formData, setFormData] = useState({})
    const fileRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (imgFile?.name) {
            uploadImage(imgFile);
        }
    }, [imgFile]);

    const uploadImage = (file) => {
        const storage = getStorage(firebaseApp);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setImagePercent(progress);
            },
            (error) => {
                setError(error);
            },
            async () => {
                const response = await getDownloadURL(uploadTask.snapshot.ref)
                setFormData(prevState => {
                    return {
                        ...prevState,
                        response
                    }
                })
            });
    }

    const uploadFileChange = (e) => {
        const file = e.target.files[0];
        setImgFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
    }

    const inputChangeHandler = (e) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }

    const submitHandler = () => {
        console.log(formData);
    }
    return (
        <div>
            <Header/>
            <form className={'flex flex-col items-center justify-center gap-4'} onSubmit={submitHandler}>
                <h1 className={'uppercase font-extrabold text-2xl mt-4'}>
                    Profile
                </h1>
                <input type={"file"} ref={fileRef} hidden={true} accept={'image/*'}
                       onChange={uploadFileChange}/>
                <img src={user.avatar} alt={user.displayName} className={'rounded-full cursor-pointer'}
                     onClick={() => fileRef.current.click()}/>
                <div hidden={imagePercent === 0}>{imagePercent}%</div>
                <div hidden={imagePercent !== 100}>Successfully upload.</div>
                <input type={'name'} placeholder={'name'}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'name'}/>
                <input type={'email'} placeholder={'email'}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'email'}/>
                <input type={'password'} placeholder={'password'}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'password'}/>
                <button
                    className={'text-white rounded-lg p-2 max-w-lg w-96 uppercase bg-cyan-700 hover:bg-cyan-900 font-extrabold'}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default Profile;