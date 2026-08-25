import { useState } from 'react'
import * as Styled from './styles'
import type { AvatarProps } from './types'

export function Avatar({
  'aria-hidden': ariaHidden = true,
  imageUrl,
  initials,
  size = 'md',
  tone = 'neutral',
  ...props
}: AvatarProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const shouldShowImage = Boolean(imageUrl && imageUrl !== failedImageUrl)

  return (
    <Styled.Avatar
      {...props}
      $size={size}
      $tone={tone}
      aria-hidden={ariaHidden}
      data-size={size}
      data-tone={tone}
    >
      {initials}
      {shouldShowImage ? (
        <Styled.Image
          alt=""
          src={imageUrl}
          onError={() => setFailedImageUrl(imageUrl ?? null)}
        />
      ) : null}
    </Styled.Avatar>
  )
}

export type { AvatarProps, AvatarSize, AvatarTone } from './types'
