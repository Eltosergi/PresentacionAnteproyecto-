import logoUcn from "../assets/logo-ucn.png";
import logoUcnCirculo from "../assets/logo-ucn-circulo.png";

const imgReset = "!m-0 !border-0 !bg-transparent !shadow-none !max-w-none !max-h-none";

const posicionPortada = { left: 60, top: 260, width: 260, height: 260 };
const posicionMarco = { left: 19, top: 635, width: 67, height: 67 };

export function Marco({ visible }: { visible: boolean }) {
  return (
    <div className="absolute left-0 top-0 z-0 w-[960px] h-[720px] pointer-events-none">
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-[140px] bg-[#002344]" />
      </div>
      <img
        src={logoUcn}
        alt=""
        className={`absolute left-[19px] top-[635px] w-[289px] h-[67px] [clip-path:inset(0_0_0_23.2%)] transition-opacity duration-200 ${imgReset} ${
          visible ? "opacity-100 delay-[250ms]" : "opacity-0"
        }`}
      />
      <img
        src={logoUcnCirculo}
        alt="Universidad Católica del Norte"
        style={visible ? posicionMarco : posicionPortada}
        className={`absolute transition-[left,top,width,height] duration-[400ms] ease-in-out ${imgReset}`}
      />
    </div>
  );
}
