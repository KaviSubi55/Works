import CardOverlay from '../CardOverlay';

const HomeMain: React.FC = () => {
    return (
        <div
            className="w-full max-w-full h-screen mt-[26px] mb-[50px] bg-cover bg-center bg-no-repeat rounded-b-[50%_40%] box-border md:h-[60vh] md:mt-[50px] md:rounded-b-[40%_20%] md:pb-10 md:mb-10 lg:h-[70vh] max-[480px]:w-full max-[480px]:rounded-b-[30%_15%]"
            style={{ backgroundImage: `url(/activity.png)` }}
        >
            <CardOverlay />
        </div>
    );
};

export default HomeMain;
