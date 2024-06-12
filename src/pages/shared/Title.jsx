import PropTypes from 'prop-types';

const Title = ({title}) => {
    return (
        <div className='flex justify-center items-center flex-col mb-10'>
            <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 text-center'>{title}</h1>
            <div className='border-[3px] rounded border-green-600 w-[200px]'></div>
        </div>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title;