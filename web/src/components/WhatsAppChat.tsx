import React, { useState, useEffect, useCallback } from 'react';

interface Message {
  id: number;
  sender: 'Ludmila' | 'Anatoli Bistró';
  text: string;
  isBot: boolean;
}

const WhatsAppChat = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Siempre visible para animaciones

  const conversation = useCallback((): Message[] => [
    {
      id: 1,
      sender: 'Ludmila',
      text: '¿Mesa para hoy a las 9?',
      isBot: false
    },
    {
      id: 2,
      sender: 'Anatoli Bistró',
      text: 'Sí, disponible. ¿Para cuántas personas y a nombre de quien?',
      isBot: true
    },
    {
      id: 3,
      sender: 'Ludmila',
      text: 'Para 3 personas. A nombre de Ludmila',
      isBot: false
    },
    {
      id: 4,
      sender: 'Anatoli Bistró',
      text: 'Confirmo tu reserva para 3 a las 9pm a nombre de Ludmila.',
      isBot: true
    }
  ], []);

  useEffect(() => {
    console.log('WhatsApp Animation - Index:', currentMessageIndex, 'ShowMessage:', showMessage);
    const conversationData = conversation();
    
    if (currentMessageIndex < conversationData.length) {
      const currentMessage = conversationData[currentMessageIndex];
      let charIndex = 0;
      
      // Resetear INMEDIATAMENTE todos los estados al cambiar de mensaje
      setCurrentText('');
      setStartTyping(false);
      setShowMessage(false);
      
      // Esperar un momento para que se complete el reset, luego empezar la animación
      const resetTimer = setTimeout(() => {
        // Fade in de la burbuja vacía
        setShowMessage(true);
        
        // Luego empezar el efecto typewriter
        const startTypingTimer = setTimeout(() => {
          setStartTyping(true);
          
          const typeInterval = setInterval(() => {
            if (charIndex < currentMessage.text.length) {
              setCurrentText(currentMessage.text.slice(0, charIndex + 1));
              charIndex++;
            } else {
              clearInterval(typeInterval);
              
              // Mostrar el mensaje completo por 2.5 segundos, luego desaparecer suavemente
              setTimeout(() => {
                // Animación de salida suave
                setShowMessage(false);
                
                // Esperar a que termine la animación de salida antes de continuar
                setTimeout(() => {
                  setStartTyping(false);
                  setCurrentMessageIndex(prev => prev + 1);
                }, 600); // Tiempo para que termine la transición de salida
              }, 2500);
            }
          }, 60); // Velocidad de escritura

          return () => clearInterval(typeInterval);
        }, 1200); // Delay para empezar a escribir

        return () => clearTimeout(startTypingTimer);
      }, 100); // Reset timer muy corto

      return () => {
        clearTimeout(resetTimer);
      };
    } else {
      // Reiniciar la animación después de un tiempo
      setTimeout(() => {
        setCurrentMessageIndex(0);
        setCurrentText('');
        setShowMessage(false);
        setStartTyping(false);
      }, 2000);
    }
  }, [currentMessageIndex, conversation]);

  if (currentMessageIndex >= conversation().length) {
    return null;
  }

  const currentMessage = conversation()[currentMessageIndex];

  console.log('Render - Index:', currentMessageIndex, 'IsBot:', currentMessage.isBot, 'Sender:', currentMessage.sender, 'ShowMessage:', showMessage);
  console.log('Animation direction will be:', currentMessage.isBot ? 'FROM BOTTOM (translateY)' : 'FROM LEFT (translateX)');

  return (
    <>
      {/* Versión para DESKTOP - NO SE MODIFICA */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 w-64">
        <div
          style={{
            transform: showMessage 
              ? 'translateX(0px) translateY(0px)' 
              : currentMessage.isBot === true
                ? 'translateX(0px) translateY(60px)'    // ANATOLI BISTRÓ: siempre desde abajo
                : 'translateX(-60px) translateY(0px)',  // ANALÍA: siempre desde izquierda
            opacity: showMessage ? 1 : 0,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div
            className={`p-3 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-1000 ease-out ${
              currentMessage.isBot
                ? 'bg-white/80 text-gray-800 ml-0 border border-green-100'
                : 'bg-[#DCF8C6]/80 text-gray-800 ml-8 border border-green-200'
            }`}
          >
            {/* Avatar y nombre */}
            <div className="flex items-center space-x-2 mb-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-700 ease-out ${
                  currentMessage.isBot
                    ? 'bg-[#25D366] text-white'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                }`}
              >
                {currentMessage.isBot ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
                  </svg>
                ) : (
                  '👩🏻‍🦱'
                )}
              </div>
              <span className="text-xs font-semibold opacity-80 tracking-wide">
                {currentMessage.sender}
              </span>
            </div>
            
            {/* Texto del mensaje */}
            <div className="text-sm leading-relaxed min-h-[20px]">
              {startTyping && currentText}
              {startTyping && currentText.length < currentMessage.text.length && (
                <span className="animate-pulse text-[#128C7E] font-bold">|</span>
              )}
              {!startTyping && (
                <div className="flex space-x-1 py-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-60"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
            
            {/* Hora y tildes de leído */}
            <div className="text-xs text-gray-500 mt-2 text-right opacity-70 flex items-center justify-end space-x-1">
              <span>
                {new Date().toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
              {/* Tildes celestes solo para mensajes de Analía */}
              {!currentMessage.isBot && (
                <svg 
                  className="w-3 h-3 ml-1" 
                  viewBox="0 0 16 11" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Primera tilde (más atrás) */}
                  <path 
                    d="M11.071 1.429L4.357 8.143L1.714 5.5L0.5 6.714L4.357 10.571L12.286 2.643L11.071 1.429Z" 
                    fill="#4fc3f7" 
                    opacity="0.7"
                  />
                  {/* Segunda tilde (más adelante) */}
                  <path 
                    d="M15.071 1.429L8.357 8.143L5.714 5.5L4.5 6.714L8.357 10.571L16.286 2.643L15.071 1.429Z" 
                    fill="#00bcd4"
                  />
                </svg>
              )}
            </div>
          </div>
          
          {/* Flecha indicadora mejorada */}
          <div
            className={`w-0 h-0 transition-all duration-800 ease-out ${
              currentMessage.isBot
                ? 'border-t-[10px] border-t-white/80 border-r-[10px] border-r-transparent ml-4 drop-shadow-sm'
                : 'border-t-[10px] border-t-[#DCF8C6]/80 border-l-[10px] border-l-transparent ml-auto mr-4 drop-shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* Versión para MÓVILES - En el borde inferior de la foto */}
      <div className="block md:hidden absolute left-0 bottom-0 z-20 w-64">
        <div
          style={{
            transform: showMessage 
              ? 'translateX(0px) translateY(0px)' 
              : currentMessage.isBot === true
                ? 'translateX(0px) translateY(60px)'    // ANATOLI BISTRÓ: siempre desde abajo
                : 'translateX(-60px) translateY(0px)',  // ANALÍA: siempre desde izquierda
            opacity: showMessage ? 1 : 0,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div
            className={`p-3 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-1000 ease-out ${
              currentMessage.isBot
                ? 'bg-white/80 text-gray-800 ml-0 border border-green-100'
                : 'bg-[#DCF8C6]/80 text-gray-800 ml-8 border border-green-200'
            }`}
          >
            {/* Avatar y nombre */}
            <div className="flex items-center space-x-2 mb-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-700 ease-out ${
                  currentMessage.isBot
                    ? 'bg-[#25D366] text-white'
                    : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                }`}
              >
                {currentMessage.isBot ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
                  </svg>
                ) : (
                  '👩🏻‍🦱'
                )}
              </div>
              <span className="text-xs font-semibold opacity-80 tracking-wide">
                {currentMessage.sender}
              </span>
            </div>
            
            {/* Texto del mensaje */}
            <div className="text-sm leading-relaxed min-h-[20px]">
              {startTyping && currentText}
              {startTyping && currentText.length < currentMessage.text.length && (
                <span className="animate-pulse text-[#128C7E] font-bold">|</span>
              )}
              {!startTyping && (
                <div className="flex space-x-1 py-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-60"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
            
            {/* Hora y tildes de leído */}
            <div className="text-xs text-gray-500 mt-2 text-right opacity-70 flex items-center justify-end space-x-1">
              <span>
                {new Date().toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
              {/* Tildes celestes solo para mensajes de Analía */}
              {!currentMessage.isBot && (
                <svg 
                  className="w-3 h-3 ml-1" 
                  viewBox="0 0 16 11" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Primera tilde (más atrás) */}
                  <path 
                    d="M11.071 1.429L4.357 8.143L1.714 5.5L0.5 6.714L4.357 10.571L12.286 2.643L11.071 1.429Z" 
                    fill="#4fc3f7" 
                    opacity="0.7"
                  />
                  {/* Segunda tilde (más adelante) */}
                  <path 
                    d="M15.071 1.429L8.357 8.143L5.714 5.5L4.5 6.714L8.357 10.571L16.286 2.643L15.071 1.429Z" 
                    fill="#00bcd4"
                  />
                </svg>
              )}
            </div>
          </div>
          
          {/* Flecha indicadora mejorada - MÓVILES: Apunta hacia ARRIBA */}
          <div
            className={`w-0 h-0 transition-all duration-800 ease-out ${
              currentMessage.isBot
                ? 'border-b-[10px] border-b-white/80 border-r-[10px] border-r-transparent ml-4 drop-shadow-sm'
                : 'border-b-[10px] border-b-[#DCF8C6]/80 border-l-[10px] border-l-transparent ml-auto mr-4 drop-shadow-sm'
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default WhatsAppChat;
