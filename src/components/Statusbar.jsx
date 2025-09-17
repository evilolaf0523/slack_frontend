import { VStack, HStack } from "@chakra-ui/react"

const Statusbar = (props)=> {
  return (
    <VStack>
      <HStack rounded={"50%"} w={"10px"} h={"10px"} border={"1px solid black"} bgColor={props.status==1?"green":props.status==2?"red":"grey"}></HStack>
    </VStack>
  )
}

export default Statusbar