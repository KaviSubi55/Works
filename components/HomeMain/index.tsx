import CardOverlay from '../CardOverlay';

const HomeMain: React.FC = () => {
    return (
        <div
            className="w-full h-screen mb-[50px] bg-cover bg-center bg-no-repeat rounded-b-[50%_40%] overflow-x-hidden md:h-[60vh] md:rounded-b-[40%_20%] md:pb-10 md:mb-10 lg:h-[70vh] max-[480px]:rounded-b-[30%_15%] mt-8"
            style={{ backgroundImage: `url(/activity.png)` }}
        >
            <CardOverlay />
        </div>
    );
};

export default HomeMain;
