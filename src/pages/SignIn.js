import { VStack, Text, HStack, Input, Button } from "@chakra-ui/react"
import { Link, Navigate, useHref, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import toast from "../utils/toast"

const SignIn = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSignin = async () => {
        if (!userInfo.email) toast.warning("Input your email")
        else if (!userInfo.password) toast.warning("Input your password")
        else {
            const result = await axios.post("http://localhost:8080/auth/signin", userInfo)
            if (result.data.status == "success") {
                toast.success(result.data.message);
                localStorage.setItem("token", result.data.token)
                navigate("/home")
            }
            if (result.data.status == "warning") {
                toast.warning("result.data.error")
            }
        }
    }

    return (
        <VStack bg={'rgb(80, 30, 80)'} w={"full"} h={'100vh'} align={'center'} justify={"center"}>
            <VStack boxShadow={'dark-lg'} border={'1px solid white'} w={'30%'} textColor={"#FFF"} rounded={"10px"} gap={'16px'} padding={'20px'}>
                <VStack w={"full"} gap={"10px"}>
                    <Text fontSize={"32px"}>Sign In</Text>
                    <Input type={'email'} name="email" placeholder={"Email"} onChange={(e) => handleChange(e)}></Input>
                    <Input type={'password'} name="password" placeholder={"Password"} onChange={(e) => handleChange(e)}></Input>
                </VStack>
                <HStack pos={"relative"} w={"full"} justify={"center"}>
                    <Button bg={'transparent'} border={'1px solid white'} onClick={handleSignin}>SignIn</Button>
                    <HStack pos={"absolute"} right={"0"}>
                        <Link to='/signup' >Go to signup</Link>
                    </HStack>
                </HStack>
            </VStack>
        </VStack>
    )
}

export default SignIn