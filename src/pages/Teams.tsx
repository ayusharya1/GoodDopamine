

const founders = [
  {
    name: "Jason Toff",
    role: "CEO",
    img: "/images/person2.avif",
    bg: "#4FC3F7"
  },
  {
    name: "Nick Kruge",
    role: "Co-founder",
    img: "/images/person3.avif",
    bg: "#F44336"
  },
  {
    name: "Bruno Oliveira",
    role: "Co-founder",
    img: "/images/person1.avif",
    bg: "#FF9800"
  },
];

const team = [
  {
    name: "Matt Fogarty",
    role: "Content Lead",
    img: "/images/673cf60777490761ff95e2e7_matt_avatar.avif",
    bg: "#fde047"
  },
  {
    name: "Camy Decembly",
    role: "Content & Community",
    img: "/images/673cf60fce3b5afbfa587d9f_camy_avatar (1).avif",
    bg: "#a78bfa"
  },
  {
    name: "Melissa Burd",
    role: "Content & Community",
    img: "/images/673cf6163542971e55441cc0_mel_avatar (1).avif",
    bg: "#34d399"
  },
];

const cardStyle = (bg: string) => ({
  background: bg,
  borderRadius: 36,
  minWidth: 350,
  maxWidth: 370,
  boxShadow: "0 4px 36px 0 rgba(0,0,0,0.09)",
  padding: 0,
  position: 'relative' as const,
  overflow: 'hidden',
  fontFamily: 'Roobert, sans-serif',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
});

const infoBarStyle = {
  background: '#e0e7ef',
  width: '100%',
  borderBottomLeftRadius: 32,
  borderBottomRightRadius: 32,
  padding: '28px 32px 24px 32px',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'flex-start' as const,
};

const nameStyle = {
  fontSize: 28,
  fontWeight: 500,
  color: '#222',
  marginBottom: 2,
  fontFamily: 'Roobert, sans-serif',
  letterSpacing: 0.1,
};

const roleStyle = {
  fontSize: 18,
  fontWeight: 400,
  color: '#444',
  fontFamily: 'Roobert, sans-serif',
  letterSpacing: 0.05,
};

export default function Teams() {
  return (
    <div className="relative min-h-screen w-full flex flex-col" style={{ backgroundColor: '#B7D4FF', fontFamily: 'Roobert, sans-serif' }}>
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: '#B7D4FF',
          backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
          backgroundSize: '200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-12 px-8">
        <div className="flex flex-row items-start">
          <div className="w-[270px] flex-shrink-0 pt-2">
            <h1 className="text-[68px] font-light text-[#2563eb] leading-none mb-10 mt-2">Team</h1>
            <h2 className="text-[42px] font-light text-[#2563eb] leading-none mb-10">Founders</h2>
          </div>
          <div className="flex-1 flex gap-12">
            {founders.map((f, i) => (
              <div
                key={f.name}
                style={{ ...cardStyle(f.bg), marginRight: i !== founders.length - 1 ? 36 : 0 }}
              >
                <img
                  src={f.img}
                  alt={f.name}
                  style={{
                    width: 220,
                    height: 220,
                    objectFit: 'contain',
                    marginTop: 32,
                    marginBottom: 8,
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.10))',
                  }}
                />
                <div style={infoBarStyle}>
                  <div style={nameStyle}>{f.name}</div>
                  <div style={roleStyle}>{f.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Team Section */}
        <div className="flex flex-row items-start mt-20">
          <div className="w-[270px] flex-shrink-0 pt-2">
            <h2 className="text-[42px] font-light text-[#2563eb] leading-none mb-10">Team</h2>
          </div>
          <div className="flex-1 flex gap-12">
            {team.map((t, i) => (
              <div
                key={t.name}
                style={{ ...cardStyle(t.bg), marginRight: i !== team.length - 1 ? 36 : 0 }}
              >
                <img
                  src={t.img}
                  alt={t.name}
                  style={{
                    width: 220,
                    height: 220,
                    objectFit: 'contain',
                    marginTop: 32,
                    marginBottom: 8,
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.10))',
                  }}
                />
                <div style={infoBarStyle}>
                  <div style={nameStyle}>{t.name}</div>
                  <div style={roleStyle}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 