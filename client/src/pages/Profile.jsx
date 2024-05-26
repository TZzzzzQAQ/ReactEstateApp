import Header from "@/components/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {firebaseApp} from "@/../fireabase.js";
import {useUserUpdate} from "@/hooks/useUserUpdate.jsx";
import {setUser} from "@/store/feature/userSlice.jsx";

const Profile = () => {
    const {isError, isSuccess, isLoading, errorMessage, fetchUserUpdate} = useUserUpdate()

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [imgFile, setImgFile] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [setError] = useState()
    const [formData, setFormData] = useState({
        ...user
    })


    const fileRef = useRef(null);

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

    const submitHandler = async (e) => {
        console.log(formData);
        e.preventDefault();
        const response = await fetchUserUpdate(user._id, formData);
        if (isSuccess) {
            dispatch(setUser(response));
        }
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
                       value={formData.name}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'name'}/>
                <input type={'email'} placeholder={'email'}
                       value={formData.email}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'email'}/>
                <input type={'password'} placeholder={'OldPassword'}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'password'}/>
                <input type={'password'} placeholder={'NewPassword'}
                       onChange={inputChangeHandler}
                       className={'rounded-lg p-2 max-w-lg w-96'}
                       id={'newPassword'}/>
                <button
                    type={"submit"}
                    disabled={isLoading}
                    className={'text-white rounded-lg p-2 max-w-lg w-96 uppercase bg-cyan-700 hover:bg-cyan-900 font-extrabold'}>
                    Update
                </button>
            </form>
            {isError && <div>{errorMessage}</div>}
        </div>
    );
};

export default Profile;