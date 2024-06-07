import PropTypes from 'prop-types';

const Title = ({title}) => {
    return (
        <div className='flex justify-center items-center flex-col mb-10'>
            <h1 className='text-5xl font-bold mb-3'>{title}</h1>
            <div className='border-[3px] rounded border-green-600 w-[200px]'></div>
        </div>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title;