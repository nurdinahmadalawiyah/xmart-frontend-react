import CardButton from "../components/CardButton.jsx";
import {Buy, Document, User} from "react-iconly";

export default function MainPage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-col md:flex-row justify-center items-center gap-20">
                <CardButton
                    title="Shop Now"
                    route="/shop"
                    icon={{name: Buy, primaryColor: 'lightgreen', size: 'xlarge', stroke: 'bold'}}
                />
                <CardButton
                    title="Customer Profile"
                    route="/profile"
                    icon={{name: User, primaryColor: 'yellow', size: 'xlarge', stroke: 'bold'}}
                />
                <CardButton
                    title="Admin"
                    route="/admin"
                    icon={{name: Document, primaryColor: 'blue', size: 'xlarge', stroke: 'bold'}}
                />
            </div>
        </section>
    );
}