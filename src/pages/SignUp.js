import { VStack, HStack, Text, Input, Button } from "@chakra-ui/react"
import { Link, useHref, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import toast from "../utils/toast"

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    })
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const handleSignup = async () => {
        if (!userInfo.username) toast.warning("Input your name")
        else if (!userInfo.email) toast.warning("Input your email")
        else if (!userInfo.password) toast.warning("Input your password")
        else if (userInfo.password != userInfo.confirm) return toast.warning("Password confirm error!")
        else {
            const result = await axios.post("http://localhost:8080/auth/signup", userInfo)
            if (result.data.status == "success") {
                navigate('/signin')
                toast.success(result.data.mes)
            }
        }
    }

    return (
        <VStack bg={'rgb(80, 30, 80)'} w={"full"} h={'100vh'} align={'center'} justify={"center"}>
            <VStack boxShadow={'dark-lg'} border={'1px solid white'} w={'30%'} textColor={"#FFF"} rounded={"10px"} gap={'16px'} padding={'20px'}>
                <Text fontSize={"32px"}>Sign Up</Text>
                <VStack w={'full'} gap={"10px"}>
                    <Input type={'text'} name="username" placeholder={"Name"} onChange={(e) => handleChange(e)}></Input>
                    <Input type={'email'} name="email" placeholder={"Email"} onChange={(e) => handleChange(e)}></Input>
                    <Input type={'password'} name="password" placeholder={"Password"} onChange={(e) => handleChange(e)}></Input>
                    <Input type={'password'} name="confirm" placeholder={"Confirm"} onChange={(e) => handleChange(e)}></Input>
                </VStack>
                <HStack pos={"relative"} justify={"center"} w={"full"}>
                    <Button bg={'transparent'} border={'1px solid white'} onClick={handleSignup}>SignUp</Button>
                    <HStack pos={'absolute'} right={0}>
                        <Link to='/signin' >Go to signin</Link>
                    </HStack>
                </HStack>
            </VStack>
        </VStack>
    )
}

export default SignUp