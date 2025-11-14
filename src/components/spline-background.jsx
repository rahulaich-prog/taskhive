import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-0"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      <Spline
        scene="https://prod.spline.design/JrhMWT4Jv1vXKCaj/scene.splinecode"
        style={{
          width: '120vw',
          height: '120vh',
          position: 'absolute',
          top: '-10vh',
          left: '-10vw',
          objectFit: 'cover',
          minWidth: '100vw',
          minHeight: '100vh',
          zIndex: 0
        }}
        onLoad={() => console.log('Spline scene loaded')}
        onError={(error) => console.error('Spline error:', error)}
      />
    </div>
  );
}