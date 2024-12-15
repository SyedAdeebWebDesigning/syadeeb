import React from 'react'
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

const Contact = () => {
    return (
        <form>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input label="Name" type="name" className={'contact-input'} variant={'flat'}/>
                <Input label="Email" type="email" className={'contact-input'} variant={'flat'}/>
            </div>
            <Textarea
                className="col-span-12 md:col-span-6 mb-6 md:mb-0 mt-4 contact-input"
                label="Description"
                labelPlacement="inside"
                variant={'flat'}

            />
            <Button
                className="col-span-12 md:col-span-6 mt-4 text-white w-full"
                color="primary"
                variant={'solid'}
                size={'lg'}
                type="submit"
            >
                Submit
            </Button>
        </form>
    )
}
export default Contact
