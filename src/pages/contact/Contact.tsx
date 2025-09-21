import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { Mail, Phone, MapPin } from 'lucide-react';
import { theme } from '../../theme';

// 공통 컴포넌트들 import
import GlobalHeader from '../../components/shared/GlobalHeader';

const ContactContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.surface};
  padding-top: 6rem; /* GlobalHeader 높이만큼 여백 추가 */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
`;

const ContactCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ContactIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  white-space: pre-line;
`;

const Contact: React.FC = () => {

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'ktshas@naver.com',
      href: 'mailto:ktshas@naver.com'
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: '서울 송파구 거주\n근무 가능 지역 서울, 성남',
      href: null
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <ContactContainer>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </SectionTitle>
            
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              구인이나 프리랜서 계약에 대한 문의는 언제든 연락주세요
            </SectionSubtitle>

            <ContactContent>
              <ContactInfo>
                {contactInfo.map((info, index) => (
                  <ContactCard
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    as={info.href ? 'a' : 'div'}
                    href={info.href || undefined}
                    target={info.href ? '_blank' : undefined}
                    rel={info.href ? 'noopener noreferrer' : undefined}
                    style={{ cursor: info.href ? 'pointer' : 'default', textDecoration: 'none' }}
                  >
                    <ContactIcon>
                      {info.icon}
                    </ContactIcon>
                    <ContactDetails>
                      <ContactLabel>{info.label}</ContactLabel>
                      <ContactValue>{info.value}</ContactValue>
                    </ContactDetails>
                  </ContactCard>
                ))}
              </ContactInfo>
            </ContactContent>
          </Container>
        </ContactContainer>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
