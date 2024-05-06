import React from "react";
import {Card, CardBody, CardFooter} from "@nextui-org/react";
import {Link} from "react-router-dom";

export default function CardButton({icon, title, route}) {
    return (
        <Link to={route} style={{textDecoration: 'none'}}>
            <Card isPressable style={{width: '200px', height: '200px'}}>
                <CardBody className=" pb-0 px-4 flex flex-col items-center justify-center">
                    {icon && React.createElement(icon.name, {
                        primaryColor: icon.primaryColor,
                        size: icon.size,
                        stroke: icon.stroke
                    })}
                </CardBody>
                <CardFooter className="overflow-visible my-2 flex items-center justify-center">
                    <h4 className="text-xl">{title}</h4>
                </CardFooter>
            </Card>
        </Link>
    );
}
